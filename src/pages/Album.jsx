import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './album.css';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: [],
      albumInfo: {},
      loading: true,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.getMusicAPI();
    this.handleSavedList();
  }

  getMusicAPI = async () => {
    const { match: { params } } = this.props;
    const albumSearchFull = await getMusics(params.id);
    const albumSearch = albumSearchFull.slice(1);
    this.setState({
      album: albumSearch,
      albumInfo: albumSearchFull[0],
      loading: false,
    });
  };

  handleCheckbox = async ({ target }) => {
    this.setState(
      { loading: true },
      async () => {
        const { album } = this.state;
        const objMusic = album
          .find((music) => Number(target.id) === Number(music.trackId));
        if (target.checked) {
          await addSong(objMusic);
          this.setState(() => ({
            loading: false,
          }));
        } else {
          await removeSong(objMusic);
          this.setState(() => ({
            loading: false,
          }));
        }
        await this.handleSavedList();
      },
    );
  }

  musicIsFavorite = (trackIdParam) => {
    const { favoriteList } = this.state;
    const favMusicOk = favoriteList.some((favMusic) => favMusic.trackId === trackIdParam);
    return favMusicOk;
  }

  handleSavedList = async () => {
    this.setState(
      { loading: true },
      async () => {
        const savedList = await getFavoriteSongs();
        this.setState(({
          loading: false,
          favoriteList: savedList,
        }));
      },
    );
  }

  render() {
    const { loading, album, albumInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div className='main-album'>
            <div className='album-cart2'>
              <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
              <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
              <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
            </div>
            <div className='music-album-list'>
              {album.map((music) => (<MusicCard
                key={ music.trackId }
                music={ music }
                funcFavSong={ this.handleCheckbox }
                checkIsFav={ this.musicIsFavorite(music.trackId) }
              />))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  params: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Album;
