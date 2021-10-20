import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

class Form extends Component {
  render() {
    const {
      name,
      onInputChange,
      isLoginButtonDisabled,
      loginButtonClick } = this.props;
    return (
      <div>
        <Input
          testeid="login-name-input"
          type="text"
          value={ name }
          name="name"
          onChange={ onInputChange }
        />
        <Button
          testeidB="login-submit-button"
          type="button"
          isDisabled={ isLoginButtonDisabled }
          ButtonClick={ loginButtonClick }
          nameButton="Entrar"
        />
      </div>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  loginButtonClick: PropTypes.func.isRequired,
};

export default Form;
