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
      <div className="Photo-container container">
        <img className="Photo-image" src={image.urls.small} alt={image.alt_description}/>
        
        <div className="Photo-overlay">
          
          {!this.props.saved ? 
          (<div onClick={() => this.props.savePhoto(image)} className="Photo-text">
            ADD TO FAVORITES</div>) 
            : 
            (<div onClick={() => this.props.savePhoto(image)} className="Photo-text">
            DELETE</div>)} 
          
          </div>
        </div>
        
   
      
    )
  }
}

export default Photo;