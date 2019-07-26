import React, { Component } from 'react';
import './SearchBar.css';
import search from './loupe.png';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleSearch(this.state.searchTerm)
  }

  render() {
    return (
      <form className="SearchBar" onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="searchTerm" 
          id="searchTerm" 
          value={this.state.searchTerm} 
          onChange={this.handleSearch}
        />
        <button className="SearchBar-button" type="submit"><img src={search} alt=""/></button>
      </form>
    )
  }
}

export default SearchBar;