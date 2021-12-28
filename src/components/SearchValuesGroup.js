import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';
import SearchValuesEntry from './SearchValuesEntry';

const searchColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const SearchValuesGroup = () => {
  const { filters: { filterByNumericValues } } = useContext(PlanetSearchContext);
  const usedColumns = filterByNumericValues.map(({ column }) => column);
  const availableColumns = searchColumns
    .filter((column) => !usedColumns.includes(column));
  const hasAvailableColumns = availableColumns.length > 0;
  return (
    <>
      { filterByNumericValues.map((filter) => (
        <SearchValuesEntry key={ filter.column } filter={ filter } />
      )) }
      {
        hasAvailableColumns
          && <SearchValuesEntry newEntry availableColumns={ availableColumns } />
      }
    </>
  );
};

export default SearchValuesGroup;
