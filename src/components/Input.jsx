import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { testeid, type, value, onChange, name } = this.props;
    return (
      <div>
        <label htmlFor={ testeid }>
          <input
            id={ testeid }
            data-testid={ testeid }
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
          />
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  testeid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
