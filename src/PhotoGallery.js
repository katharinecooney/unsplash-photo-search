import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Masonry from 'react-masonry-component';

const style = {
  margin: '20px'
};

class PhotoGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      searchTerm: '' 
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount(){
    axios.get(`https://api.unsplash.com/search/photos?page=2&query=${this.state.searchTerm}&per_page=25`, {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
      .then(response => this.setState({
        images: response.data.results
      }))
  }

  handleSearch(newTerm){
    this.setState({
      searchTerm: newTerm
    }, () => this.getImages())
  }
  
  getImages(){
    axios.get(`https://api.unsplash.com/search/photos?page=2&query=${this.state.searchTerm}&per_page=25`, {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
    .then(response => this.setState({
      images: response.data.results
    }))
  }

  render() {
    return (
      <div>
        <h1>Photo Gallery</h1>
        <SearchBar handleSearch={this.handleSearch}/>
        <Masonry>
        {this.state.images.map(image => 
          <img style={style} key={image.id} src={image.urls.small} />
        )} 
        </Masonry>
        
        
      </div>
    )
  }
}

export default PhotoGallery;