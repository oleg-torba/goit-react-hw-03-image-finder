import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageInfo } from './ImageInfo/ImageInfo';
export class App extends Component {
  state = {
    query: '',
  };

  handleformSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleformSubmit} />
        <ImageInfo searchQuery={this.state.query}/>
      </div>
    );
  }
}
