import React, { Component } from 'react';
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class PeoplePage extends Component{

  state = {
    selectedPerson: 5,
    hasError: false
  };

  componentDidCatch(){
    this.setState({hasError: true})
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  };

  render(){

    if(this.state.hasError){
      return <ErrorIndicator/>
    }

    return (
      <main className="row mb2">
        <section className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected}/>
        </section>
        <section className="col-md-6">
          <PersonDetails personId={this.state.selectedPerson}/>
        </section>
      </main>
    )
}
}