import React, { Component } from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';


export default class PeoplePage extends Component{
  swapiService = new SwapiService();

  state = {
    selectedPerson: 11
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };

  render(){

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {(i) => `${i.name}, ${i.birthYear}`}
      </ItemList>

    );
    const itemDetails = (
      <ItemDetails
        itemId={this.state.selectedPerson}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage}
      />
      );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={itemDetails}/>
      </ErrorBoundry>
    )
}
}