import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import { fetchImages } from 'components/Services/FetchImages';
import { ImageList } from 'components/ImageList/ImageList';
import { LoadMore } from 'components/LoadMore/LoadMore';
import Css from '../ImageList/Card.module.css';

export class ImageInfo extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    totalImages: null,
    error: null
  };
  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const {searchQuery} = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      this.setState({
        images: [],
        page: 1,
      });
    }

    if (prevProps.searchQuery !== searchQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      const images = await fetchImages(searchQuery, page);
      if (images.hits.length > 0) {
        this.setState({
          images: this.state.images.concat(images.hits),
          totalImages: images.total,
          status: 'resolved',
          error: null
        });
      }
      else{this.setState({
        error: 'No found images',
        status: 'rejected'
      })
    }
    }
  }

  loadMore = e => {
    e.preventDefault();
    if (this.state.page === Math.ceil(this.state.totalImages / 12)) {
      return alert('end images');
    }
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {

    const { images, status, error } = this.state;
    const {searchQuery} = this.props

    return (
      <><div className={Css.errorContainer}>
        {error !== null && (
            <h1 className={Css.errorTitle}>No found images by query: '{searchQuery}'</h1>
        )}
      </div>
        <div>
          {status === 'resolved' && (
            <ul className={Css.gallery}>
              {images.map(image => {
                return (
                  <ImageList
                    key={image.id}
                    image={{
                      webformatURL: image.webformatURL,
                      tags: image.tags,
                      largeImageURL: image.largeImageURL,
                    }}
                  />
                );
              })}
            </ul>
          )}
        </div>
        <div>
          {this.state.totalImages !== images.length && this.state.status === 'resolved' && 
            status === 'resolved' && <LoadMore onClick={this.loadMore} />}
            {status === 'pending' && <ThreeDots />}
        </div>
        
      </>
    );
  }
}

ImageInfo.propTypes = {
    searchQuery: PropTypes.string.isRequired
}