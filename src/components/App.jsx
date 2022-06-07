import React, { Component } from "react";
import Loader from "./Loader/Loader";
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import api from '../Api/api';


class App extends Component {
  
  state = {
    gallery: [],
    searchQuery: '',
    page: 1,
    modalImg: '',
    modalAlt: '',
    showModal: false,
    error: null,
    status: 'idle',
  };

   componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevQuery !== nextQuery) {
      this.setState({ gallery: [], status: 'pending' });
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      api
        .fetchImages(nextQuery, nextPage)
        .then(({ hits }) => {
          const images = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            },
          );
          if (images.length > 0) {
            this.setState(prevState => {
              return {
                gallery: [...prevState.gallery, ...images],
                status: 'resolved',
              };
            });
          } else {
            alert(`По запросу ${nextQuery} ничего не найдено.`);
            this.setState({ status: 'idle' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmitInput = newQuery => {
    if (newQuery !== this.state.searchQuery) {
      this.setState({ searchQuery: newQuery, page: 1, status: 'pending' });
    }
  };

  handleClickImg = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;
    this.setState({
      showModal: true,
      modalImg: imgForModal,
      modalAlt: altForModal,
    });
  };

  handleClickBtn = () => {
    this.setState(({ page }) => {
      return { page: page + 1, status: 'pending' };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };


  render() {
    const { gallery, showModal, modalImg, modalAlt, error, status } =
      this.state;

    if (status === 'idle') {
      return (        
          <Searchbar onSubmit={this.handleSubmitInput} />        
      );
    }

    if (status === 'pending') {      
      return (        
        <>
          <Searchbar onSubmit={this.handleSubmitInput} />
          {gallery.length > 0 && <ImageGallery gallery={gallery} />}
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={modalImg} alt={modalAlt} />
            </Modal>
          )}          
            <Searchbar onSubmit={this.handleSubmitInput} />
            <ImageGallery
              onClickImg={this.handleClickImg}
              gallery={this.state.gallery}
            />
            <Button handleClickBtn={this.handleClickBtn} />          
        </>
      );
    }
  }
}
  
export default App;