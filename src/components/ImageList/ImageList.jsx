import CardCss from './Card.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
export class ImageList extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props.image;

    return (
      <div className={CardCss.cardItem}>
        <li className={CardCss.cardList} key={this.props.image.key} onClick={this.toggleModal}>
          <img src={webformatURL} alt={tags} width="280" height="240" />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" width="600 " height="450"/>
          </Modal>
        )}
      </div>
    );
  }
}

ImageList.propTypes = {
     webformatURL: PropTypes.string.isRequired, 
     largeImageURL: PropTypes.string.isRequired,
     tags: PropTypes.string.isRequired,
}