import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from '../../services/swapi-service'
import './app.css';
import ErrorBoundry from "../error-boundry/error-boundry";
import Row from "../row/row";
import ItemDetails,{Record} from "../item-details";

export default class App extends Component{

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };


  componentDidCatch(){
    this.setState({hasError: true})
  }

  render(){
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    if(this.state.hasError){
      return <ErrorIndicator/>
    }

    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={13}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="Birth Year"/>
        <Record field="eyeColor" label="Eye Color"/>
        <Record field="hairColor" label="Hair Color"/>
        <Record field="height" label="Height"/>

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={23}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
        <Record field="model" label="Model"/>
        <Record field="manufacturer" label="Manufacturer"/>
        <Record field="costInCredits" label="Cost"/>
        <Record field="length" label="Length"/>
        <Record field="crew" label="Crew"/>
        <Record field="passengers" label="Passengers"/>
        <Record field="cargoCapacity" label="Cargo Capacity"/>
      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="wrapper">
          <Header />
          { planet }

          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          {/*<PeoplePage />*/}
          <Row left={personDetails} right={starshipDetails}/>
        </div>
      </ErrorBoundry>
    );
  }
};

