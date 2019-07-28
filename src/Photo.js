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

  render() {
    let {image} = this.props;
    return (
      <div  onMouseLeave={this.handleExit} className="Photo-container container">
        <img className="Photo image" src={image.urls.small} alt={image.alt_description}/>
        {/* {this.state.isHovered && <div className="Photo-saveBar">ADD TO FAVORITES</div> } */}
        <div className="Photo-saveBar overlay">
          <div className="text">
            ADD TO FAVORITES</div>
          </div>
        </div>
        
   
      
    )
  }
}

export default Photo;