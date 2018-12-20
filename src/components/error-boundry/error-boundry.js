import ErrorIndicator from "../error-indicator/error-indicator";
import React,{Component} from "react";

export default class ErrorBoundry extends Component{
  state = {
    hasError: false
  };
  componentDidCatch(){
    this.setState({hasError: true})
  }
  render(){
    if(this.state.hasError){
      return <ErrorIndicator/>
    }
    return this.props.children;
  }
}