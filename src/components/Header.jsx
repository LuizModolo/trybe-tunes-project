import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState(
      { loading: true },
      async () => {
        const userName = await getUser();
        this.setState({
          user: userName,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div className='total-header' data-testid="header-component">
        <header>
          {loading ? <Loading /> : (
            <div className='header'>
              <div className='header-top'>
                <img className='logo-header' src='/Group 1 1.png' alt='trybetuneslogo' />
                <div className='login-name'>
                  <img src='/user.png' alt='user-icon' />
                  <p data-testid="header-user-name">{user.name}</p>
                </div>
              </div>
              <div className='header-botton' >
                <Link className='header-link' data-testid="link-to-search" to="/search">
                  <div>
                    <p>Pesquisar</p>
                  </div></Link>
                <Link className='header-link' data-testid="link-to-favorites" to="/favorites"><div>
                    <p>Favoritas</p>
                  </div></Link>
                <Link className='header-link' data-testid="link-to-profile" to="/profile"><div>
                    <p>Perfil</p>
                  </div></Link>
              </div>
            </div>)}
        </header>
      </div>
    );
  }
}

export default Header;
