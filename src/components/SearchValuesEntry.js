import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PlanetSearchContext } from '../context';
import { useValuesFilterFields } from '../hooks';
import { makeOptionsObjectFrom, makePropObjectWith } from '../services';
import SelectInput from './SelectInput';
import GenericInput from './GenericInput';

const TEST_ID_KEY = 'data-testid';

const comparisons = [
  'maior que',
  'menor que',
  'igual a',
];

const renderButton = ({ newEntry, buttonCallback, param }) => (
  <button
    type="button"
    { ...newEntry && { 'data-testid': 'button-filter' } }
    onClick={ () => buttonCallback(param) }
  >
    { newEntry ? 'Filtrar' : 'X' }
  </button>
);

const SearchValuesEntry = (
  { newEntry = false, filter = {}, availableColumns = [''] },
) => {
  const { addFilterByValue, removeFilterByValue } = useContext(PlanetSearchContext);
  const [valuesFilter, handleFilterChanges] = useValuesFilterFields();

  const buttonCallback = newEntry ? addFilterByValue : removeFilterByValue;
  const inputProperties = ['name', 'value', 'onChange', 'disabled'];
  const commonValues = [handleFilterChanges, !newEntry];
  const columnsProps = makePropObjectWith(
    inputProperties,
    ['column', filter.column, ...commonValues],
  );
  const comparisonsProps = makePropObjectWith(
    inputProperties,
    ['comparison', filter.comparison, ...commonValues],
  );
  const valueProps = makePropObjectWith(
    ['type', ...inputProperties],
    ['number', 'value', filter.value, ...commonValues],
  );

  if (newEntry) {
    columnsProps[TEST_ID_KEY] = 'column-filter';
    comparisonsProps[TEST_ID_KEY] = 'comparison-filter';
    valueProps[TEST_ID_KEY] = 'value-filter';
  }

  return (
    <div { ...!newEntry && { [TEST_ID_KEY]: 'filter' } }>
      <SelectInput
        selectProps={ columnsProps }
        newEntry={ newEntry }
        options={ newEntry
          ? makeOptionsObjectFrom(availableColumns)
          : makeOptionsObjectFrom([filter.column]) }
      />
      <SelectInput
        selectProps={ comparisonsProps }
        newEntry={ newEntry }
        options={ makeOptionsObjectFrom(comparisons) }
      />
      <GenericInput
        inputProps={ valueProps }
        newEntry={ newEntry }
      />

      { renderButton(
        { newEntry, buttonCallback, param: newEntry ? valuesFilter : filter },
      ) }
    </div>
  );
};

export default SearchValuesEntry;

SearchValuesEntry.propTypes = {
  newEntry: PropTypes.bool,
  availableColumns: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.shape({
    column: PropTypes.string,
    comparison: PropTypes.string,
    value: PropTypes.string,
  }),
};

SearchValuesEntry.defaultProps = {
  newEntry: false,
  availableColumns: [],
  filter: {
    column: '',
    comparison: '',
    value: '0',
  },
};
