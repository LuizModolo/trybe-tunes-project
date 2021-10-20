import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo = async () => {
    this.setState(
      { loading: true },
      async () => {
        const userName = await getUser();
        this.setState({
          ...userName,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
            <div>
              <h2>Nome</h2>
              <p>{name}</p>
            </div>
            <div>
              <h2>E-mail</h2>
              <p>{email}</p>
            </div>
            <div>
              <h2>Descrição</h2>
              <p>{description}</p>
            </div>
          </div>)}
      </div>
    );
  }
}

export default Profile;
