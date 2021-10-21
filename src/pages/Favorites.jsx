import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.handleSavedList();
  }

  handleCheckbox = async ({ target }) => {
    this.setState(
      { loading: true },
      async () => {
        const { favoriteList } = this.state;
        const objMusic = favoriteList
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
    const { loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <div className='favorits-list'>
            <h2>Músicas Favoritas</h2>
            <div>
              {favoriteList.map((music) => (<MusicCard
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

export default Favorites;
