import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import FormProfile from '../components/FormProfile';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      isSaved: false,
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateFields = () => {
    const { name, email, description, image } = this.state;
    if (name !== '' && email !== '' && description !== '' && image !== '') {
      return false;
    }
    return true;
  }

  saveProfileInfo = async () => {
    const { name, email, description, image } = this.state;
    this.setState(
      { loading: true },
      async () => {
        const userInfo = await updateUser({ name, email, description, image });
        this.setState({
          ...userInfo,
          isSaved: true,
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, isSaved } = this.state;
    if (isSaved) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <FormProfile
            { ...this.state }
            isButtonDisabled={ this.validateFields() }
            saveFunc={ this.saveProfileInfo }
            handleChange={ this.handleChange }
          />)}
      </div>
    );
  }
}

export default ProfileEdit;
