import React, { Component } from 'react';
import Search from './Search.module.css';
import PropTypes from 'prop-types';


export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery === '') {
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit} className={Search.form}>
          <button type="submit" className={Search.formBtn}>
            <span>Search</span>
          </button>

          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}