import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './PhotoGallery.css';
import chevron from './up-chevron.png';
import SmoothScrolling from "./smoothScrolling";
import Photo from './Photo';

class PhotoGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      hasUserSearched: false,
      searchTerm: '',
      savedPhotos: JSON.parse(window.localStorage.getItem("savedPhotos") || "[]"),
      savedPhotoIDs: [],
      numSavedPhotos: 0,
      hasLoadedImages: false,
      requestedSavedPhotos: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getImages = this.getImages.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.retrieveSavedPhotos = this.retrieveSavedPhotos.bind(this);
    this.deleteSavedPhoto = this.deleteSavedPhoto.bind(this);
  }

  componentDidMount(){
    console.log(this.state.savedPhotos)
  }

  scrollUp() {
    SmoothScrolling.scrollTo("begin");
  }

  savePhoto(newPhoto){
    console.log('new photo ID is ', newPhoto.id)
    console.log('this photo is saved in the state ', this.state.savedPhotos.includes(newPhoto.id))
    if (!this.state.savedPhotoIDs.includes(newPhoto.id)) {
      this.setState(curState => ({
        savedPhotos: [...curState.savedPhotos, newPhoto],
        savedPhotoIDs: [...curState.savedPhotoIDs, newPhoto.id]
      }), () => window.localStorage.setItem("savedPhotos", JSON.stringify(this.state.savedPhotos)))
    }
    console.log(this.state.savedPhotoIDs); 
  }

  handleSearch(newTerm){
    this.setState({
      searchTerm: newTerm,
      requestedSavedPhotos: false,
      hasUserSearched: true
    }, () => this.getImages())
  }
  
  getImages(){
    axios.get(`https://api.unsplash.com/search/photos?page=2&query=${this.state.searchTerm}&per_page=25`, {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
    .then(response => this.setState({
      images: response.data.results,
      hasLoadedImages: true
    }))
  }

  retrieveSavedPhotos(){
    console.log('requested photos');
    this.setState({
      requestedSavedPhotos: true
    })
  }

  deleteSavedPhoto(id){
    console.log(id);
    this.setState(curState => ({
      savedPhotos: curState.savedPhotos.filter(image => image.id !== id),
      savedPhotoIDs: curState.savedPhotoIDs.filter(photoID => photoID !== id)
    }), 
    () => window.localStorage.setItem("savedPhotos", JSON.stringify(this.state.savedPhotos))
    )
  }

  render() {
    
    let displaySavedPhotos = (this.state.savedPhotos.map(image => <Photo location="savedPage" deletePhoto={this.deleteSavedPhoto} saved={this.state.savedPhotoIDs.includes(image.id)} key={image.id} image={image} />))
   
    let displaySearchedPhotos = (this.state.images.map(image => 
      <Photo location="mainPage" saved={this.state.savedPhotoIDs.includes(image.id)} deletePhoto={this.deleteSavedPhoto} savePhoto={this.savePhoto} key={image.id} image={image} />
      ))
   
    let noPhotosSearched = (<span>Search for a photo!</span>)
    
    return (
      <div className="PhotoGallery" id="begin">
        
        <div className="PhotoGallery-title">
          <h1 id="top">Photo Gallery</h1>
          <SearchBar handleSearch={this.handleSearch}/>
        </div>

        <button onClick={this.retrieveSavedPhotos}>Get saved photos</button>
        {
          !this.state.hasUserSearched && noPhotosSearched
        }

        {
          this.state.requestedSavedPhotos && displaySavedPhotos
        }

        {
          !this.state.requestedSavedPhotos && displaySearchedPhotos
        } 
          
          {
          this.state.hasLoadedImages && 
          <div className="PhotoGallery-scroll">
            <a href="#top" onClick={this.scrollUp}>
            <img src={chevron} alt="scroll up arrow"></img>
            </a>
          </div>
          } 
          
        {/* </Masonry> */}
      </div>
    )
  }
}

export default PhotoGallery;