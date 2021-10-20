import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../components/Form';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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

  //  fetchAPI = async (event) => {
  //    event.preventDefault();
  //    const { checkLoginInput } = this.state;
  //    this.setState({ loading: true },
  //      () => createUser({ name: checkLoginInput })
  //        .then(() => this.setState({
  //          loading: false,
  //          redirectLogin: true,
  //        })));
  //  }

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
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <Form
              { ...this.state }
              onInputChange={ this.handleChange }
              loginButtonClick={ this.fetchAPI }
            />)}
      </div>
    );
  }
}

export default Login;
