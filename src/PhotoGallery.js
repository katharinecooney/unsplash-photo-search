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
      searchTerm: '',
      hasLoadedImages: false,
      requestedSavedPhotos: false,
      hasUserSearched: false,
      savedPhotos: JSON.parse(window.localStorage.getItem("savedPhotos") || "[]"),
      savedPhotoIDs: JSON.parse(window.localStorage.getItem("savedPhotoIDs") || "[]")
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getImages = this.getImages.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.retrieveSavedPhotos = this.retrieveSavedPhotos.bind(this);
    this.deleteSavedPhoto = this.deleteSavedPhoto.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
  }

  handleSearch(newTerm){
    this.setState({
      searchTerm: newTerm,
      // if the user requested saved photos, the state will reset to false to remove saved photos when new term is searched
      requestedSavedPhotos: false,
      hasUserSearched: true
    }, () => this.getImages())
  }
  
  getImages(){
    axios.get(`https://api.unsplash.com/search/photos?page=2&query=${this.state.searchTerm}&per_page=24`, {headers: {Authorization: 'Client-ID 282d6101c992fd476700cb4c1f429cee107dee704a8056775b945fd16126d59b'}})
    .then(response => this.setState({
      images: response.data.results,
      hasLoadedImages: true
    }))
  }

  savePhoto(newPhoto){
    // use ID to check if the photo has already been saved
    if (!this.state.savedPhotoIDs.includes(newPhoto.id)) {
      // save photo object to savedPhotos in the state
      // save photo ID to savePhotoIDs in the state 
      this.setState(curState => ({
        savedPhotos: [...curState.savedPhotos, newPhoto],
        savedPhotoIDs: [...curState.savedPhotoIDs, newPhoto.id]
      }), 
      // save photo object to savedPhotos in localStorage
      // save photo ID to savePhotoIDs in localStorage
      () => {
        window.localStorage.setItem("savedPhotos", JSON.stringify(this.state.savedPhotos)); window.localStorage.setItem("savedPhotoIDs", JSON.stringify(this.state.savedPhotoIDs)) 
      })
    }
  }

  // will use requestSavedPhotos to conditionally render saved photos 
  retrieveSavedPhotos(){
    this.setState({
      requestedSavedPhotos: true
    })
  }

  deleteSavedPhoto(id){
    // will save all savedPhotos except for the photo with the provided id 
    // will save all savedPhotoIDs except for the  provided id 
    this.setState(curState => ({
      savedPhotos: curState.savedPhotos.filter(image => image.id !== id),
      savedPhotoIDs: curState.savedPhotoIDs.filter(photoID => photoID !== id)
    }), 
    // will update the savedPhotos and savedPhotoIDs in localStorage
    () => {
      window.localStorage.setItem("savedPhotos", JSON.stringify(this.state.savedPhotos)); 
      window.localStorage.setItem("savedPhotoIDs", JSON.stringify(this.state.savedPhotoIDs)); 
    })
  }

  // this function will smooth scroll to the start of page
  scrollUp() {
    SmoothScrolling.scrollTo("begin");
  }

  render() {
    let displaySavedPhotos = (this.state.savedPhotos.map(photo => 
    <Photo 
      location="savedPage" 
      deletePhoto={this.deleteSavedPhoto} 
      saved={this.state.savedPhotoIDs.includes(photo.id)} 
      key={photo.id} 
      image={photo} 
    />))
   
    let displaySearchedPhotos = (this.state.images.map(photo => 
    <Photo 
      location="mainPage" 
      saved={this.state.savedPhotoIDs.includes(photo.id)} 
      deletePhoto={this.deleteSavedPhoto} 
      savePhoto={this.savePhoto} 
      key={photo.id} 
      image={photo} 
    />))
   
    return (
      <div className="PhotoGallery" id="begin">
        <div className="PhotoGallery-title">
          <h1 id="top">Photo Gallery</h1>
          <SearchBar handleSearch={this.handleSearch}/>
          <span className="PhotoGallery-savedButton" onClick={this.retrieveSavedPhotos}>View saved photos</span>
        </div>
        <div className="PhotoGallery-container">
          {/* will display saved photos*/}
          {this.state.requestedSavedPhotos && displaySavedPhotos}
          {/* will display searched photos*/}
          {!this.state.requestedSavedPhotos && displaySearchedPhotos}
        </div>
         
        {/* will display scroll arrow after user has searched for photos OR requested their saved photos */}
        {(this.state.hasLoadedImages || this.state.requestedSavedPhotos) && 
        <div className="PhotoGallery-scroll">
          <a href="#top" onClick={this.scrollUp}>
          <img src={chevron} alt="scroll up arrow"></img>
          </a>
        </div>} 
      </div>
    )
  }
}

export default PhotoGallery;