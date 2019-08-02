import React, { Component } from 'react';
import './Photo.css';

class Photo extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHovered: false
    }
    this.handleHover = this.handleHover.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleHover(){
    this.setState({
      isHovered: true
    })
  }

  handleExit(){
    this.setState({
      isHovered: false
    })
  }

  handleSave(){
    this.props.savePhoto()
  }

  render() {
    let {image} = this.props;
    return (
      <div className="Photo-container">
        <img className="Photo-image" src={image.urls.small} alt={image.alt_description}/>
        
        <div className="Photo-overlay">
          
          {(!this.props.saved && this.props.location === "mainPage") ? 
          (<div onClick={() => this.props.savePhoto(image)} className="Photo-text">
            <p>ADD TO FAVORITES</p>
            <i className="Photo-overlay-icon far fa-heart fa-2x"></i> 
            </div>) 
            : 
            (<div onClick={() => this.props.deletePhoto(image.id)} className="Photo-text">
            <p>REMOVE FROM FAVORITES</p>
            <i className="Photo-overlay-icon far fa-trash-alt fa-2x"></i>
            </div>)} 
          </div>
        </div>
        
   
      
    )
  }
}

export default Photo;