import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ selectProps, options, newEntry }) => {
  if (newEntry) {
    delete selectProps.value;
  }
  return (
    <select { ...selectProps }>
      { options.map(
        (option) => (
          <option value={ option.value } key={ `${selectProps.name}${option.key}` }>
            { option.name }
          </option>
        ),
      )}
    </select>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  selectProps: PropTypes.objectOf(PropTypes.any).isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  newEntry: PropTypes.bool,
};

SelectInput.defaultProps = {
  newEntry: false,
};
