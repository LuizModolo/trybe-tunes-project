import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { testeidB, isDisabled, ButtonClick, nameButton } = this.props;
    return (
      <div>
        <button
          type="submit"
          data-testid={ testeidB }
          disabled={ isDisabled }
          onClick={ ButtonClick }
        >
          {nameButton}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  testeidB: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  ButtonClick: PropTypes.func.isRequired,
};

export default Button;
