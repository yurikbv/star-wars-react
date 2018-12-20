import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import './item-details.css';
import Spinner from "../spinner/spinner";

const Record = ({item, field, label}) => {
  return (
   <li className="list-group-item">
    <span className="term">{label} : </span>
    <span>{ item[field] }</span>
  </li>
  )
};

export {
  Record
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: true
  };

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps){
    if(this.props.itemId !== prevProps.itemId){
      this.setState({ loading: true});
      this.updateItem();
    }
  }

  updateItem(){
    const { itemId, getData, getImageUrl } = this.props;
    if(!itemId){
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl({id: itemId})
          })
      });
  }

  render() {

    if(!this.state.item){
      return <span>Select item from a List</span>
    }

    const {item, loading, image} = this.state;
    const  spinner = loading ? <Spinner /> : null;
    const children = React.Children.map(this.props.children, (child) => React.cloneElement(child,{item}));
    const content = !loading? <ItemView item={item} image={image} children={children}/> : null;

    return (
      <div className="person-details card">
        { spinner }
        { content }
      </div>
    )
  }
}

const ItemView = ({item, image, children}) => {
  const { name } = item;
  return (
    <React.Fragment>
      <img className="person-image" alt="item"
           src={image} />

      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          {children}
        </ul>
      </div>
    </React.Fragment>
  )
};
