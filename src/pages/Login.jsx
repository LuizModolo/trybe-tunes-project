import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../components/Form';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './login.css';
import LogoTunes from '../images/LOGO_POSITIVA 1.png'
import imgLogin from '../images/3071357.jpg'

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      isLoginButtonDisabled: true,
      redirectLogin: false,
    };
  }

  fetchAPI = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const login = await createUser({ name });
        if (login === 'OK') {
          this.setState({
            loading: false,
            redirectLogin: true,
          });
        }
      },
    );
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.handleLogin);
  };

  handleLogin = () => {
    const { name } = this.state;
    const minCaracterLogin = 2;
    if (name.length > minCaracterLogin) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  render() {
    const { loading, redirectLogin } = this.state;
    if (redirectLogin) {
      return <Redirect to="/search" />;
    }
    return (
      <div className="login" data-testid="page-login">
        {loading ? <Loading />
          : (
            <div>
              <div className='logotunes'>
                <img src={LogoTunes} alt='trybetuneslogo' />
              </div>
              <div className="total-login">
                <div className="image-login">
                  <img src={imgLogin} alt='login' />
                </div>
                <div className="form-login">
                  <h2>Nome do usuário:</h2>
                  <Form
                  { ...this.state }
                  onInputChange={ this.handleChange }
                  loginButtonClick={ this.fetchAPI }
                  />
                </div>
              </div>
            </div>
            )}
      </div>
    );
  }
}

export default Login;
