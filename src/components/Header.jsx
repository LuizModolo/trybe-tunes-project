import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="header-component">
        <header>
          {loading ? <Loading /> : (
            <div>
              <p data-testid="header-user-name">{user.name}</p>
              <div>
                <Link data-testid="link-to-search" to="/search"> Pesquisar </Link>
                <Link data-testid="link-to-favorites" to="/favorites"> Favoritas </Link>
                <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
              </div>
            </div>)}
        </header>
      </div>
    );
  }
}

export default Header;
