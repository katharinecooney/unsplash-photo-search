import React, { Component } from 'react';
import axios from 'axios';

class PhotoGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount(){
    axios.get('https://api.unsplash.com/search/photos?page=2&query=office&per_page=25', {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
      .then(response => this.setState({
        images: response.data.results
      }))
  }

  render() {
    return (
      <div>
        <h1>photo gallery</h1>
        {this.state.images.map(image => 
          <img key={image.id} src={image.urls.full} />
        )}
      </div>
    )
  }
}

export default PhotoGallery;