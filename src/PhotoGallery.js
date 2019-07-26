import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Masonry from 'react-masonry-component';
import './PhotoGallery.css';
import chevron from './up-chevron.png';
import SmoothScrolling from "./smoothScrolling";


const imgStyle = {
  margin: '8px'
};

class PhotoGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      searchTerm: '',
      hasLoadedImages: false 
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getImages = this.getImages.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
  }

  scrollUp() {
    SmoothScrolling.scrollTo("begin");
  }

  componentDidMount(){
    axios.get(`https://api.unsplash.com/search/photos?page=2&query=${this.state.searchTerm}&per_page=25`, {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
      .then(response => this.setState({
        images: response.data.results,
        
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
      images: response.data.results,
      hasLoadedImages: true
    }))
  }



  render() {
    return (
      <div className="PhotoGallery" id="begin">
        <h1 id="top">Photo Gallery</h1>
        <SearchBar handleSearch={this.handleSearch}/>
        <Masonry className="PhotoGallery-container" options={{fitWidth: true}}>
          {this.state.images.map(image => 
          <img style={imgStyle} key={image.id} src={image.urls.small} />
          )} 
          {this.state.hasLoadedImages && <div className="PhotoGallery-scroll">
            <a href="#top" onClick={this.scrollUp}>
            <img  src={chevron}></img>
            </a>
            
            </div>} 
          
        </Masonry>
      </div>
    )
  }
}

export default PhotoGallery;