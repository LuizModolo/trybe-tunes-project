import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormProfile extends Component {
  render() {
    const {
      name,
      email,
      description,
      image,
      isButtonDisabled,
      handleChange,
      saveFunc } = this.props;
    return (
      <div>
        <div>
          <label htmlFor="edit-input-image">
            {' '}
            Imagem:
            <input
              data-testid="edit-input-image"
              id="edit-input-image"
              name="image"
              type="text"
              value={ image }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="edit-input-name">
            {' '}
            Nome:
            <input
              data-testid="edit-input-name"
              id="edit-input-name"
              name="name"
              type="text"
              value={ name }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="edit-input-email">
            {' '}
            E-mail:
            <input
              data-testid="edit-input-email"
              id="edit-input-email"
              name="email"
              type="email"
              value={ email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="edit-input-description">
            {' '}
            Descrição:
            <input
              data-testid="edit-input-description"
              id="edit-input-description"
              name="description"
              type="text"
              value={ description }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ saveFunc }
          >
            Salvar

          </button>
        </div>
      </div>
    );
  }
}

FormProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  saveFunc: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
};

export default FormProfile;
