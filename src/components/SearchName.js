import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';

const SearchName = () => {
  const {
    filters: { filterByName: { name } },
    updateFilterByName,
  } = useContext(PlanetSearchContext);
  return (
    <div>
      <label htmlFor="filterByName">
        Name:
        <input
          id="filterByName"
          type="text"
          data-testid="name-filter"
          value={ name }
          onChange={ updateFilterByName }
        />
      </label>
    </div>
  );
};

export default SearchName;
