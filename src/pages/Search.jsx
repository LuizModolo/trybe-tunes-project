import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artists: [],
      name: '',
      isSearchButtonDisabled: true,
      loading: false,
      artNameState: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleSearch);
  };

  handleSearch = () => {
    const { name } = this.state;
    const minCaracterLogin = 1;
    if (name.length > minCaracterLogin) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  buttonSearch = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const artistList = await searchAlbumsAPI(name);
        this.setState({
          artists: artistList,
          loading: false,
          artNameState: name,
          name: '',
        });
      },
    );
  }

  render() {
    const { isSearchButtonDisabled, name, loading, artists, artNameState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <div className='total-search'>
            <div className='search-fields'>
              <Input
                testeid="search-artist-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <Button
                testeidB="search-artist-button"
                nameButton="Pesquisar"
                isDisabled={ isSearchButtonDisabled }
                ButtonClick={ this.buttonSearch }
              />
            </div>
            <div className='search-results'>
              <h2>
                {`Resultado de ??lbuns de:  ${artNameState}`}
              </h2>
              <div className='album-list'>
                {!artists.length ? <p>Nenhum ??lbum foi encontrado</p>
                  : artists.map((artist) => (
                    <div className='album-cart' key={ artist.collectionId }>
                      <Link className='link-cart'
                        data-testid={ `link-to-album-${artist.collectionId}` }
                        to={ `/album/${artist.collectionId}` }
                      >
                        <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                        <h2>{artist.collectionName}</h2>
                        <p>{artist.artistName}</p>
                      </Link>
                    </div>))}
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}

export default Search;
