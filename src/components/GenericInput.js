import React from 'react';
import PropTypes from 'prop-types';

const GenericInput = ({ inputProps, newEntry }) => {
  if (newEntry) {
    delete inputProps.value;
  }
  return (
    <input { ...inputProps } />
  );
};

export default GenericInput;

GenericInput.propTypes = {
  inputProps: PropTypes.objectOf(PropTypes.any).isRequired,
  newEntry: PropTypes.bool,
};

GenericInput.defaultProps = {
  newEntry: false,
};
