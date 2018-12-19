import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';


import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";

export default class App extends Component{
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


  componentDidCatch(){
    this.setState({hasError: true})
  }

  render(){
    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    if(this.state.hasError){
      return <ErrorIndicator/>
    }

    return (
      <div className="wrapper">
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <PeoplePage />
      </div>
    );
  }
};

