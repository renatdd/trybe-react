import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';
import { useSortFilterFields } from '../hooks';
import SelectInput from './SelectInput';
import { makeOptionsObjectFrom, COLUMNS_NAMES } from '../services';

const Sort = () => {
  const { updateSortFilter } = useContext(PlanetSearchContext);
  const [sortFilter, handleFilterChanges] = useSortFilterFields();

  return (
    <>
      <SelectInput
        selectProps={ {
          'data-testid': 'column-sort',
          name: 'column',
          onChange: handleFilterChanges,
          value: sortFilter.column,
        } }
        options={ makeOptionsObjectFrom(COLUMNS_NAMES, true) }
      />
      <label htmlFor="ASC">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          id="ASC"
          name="sort"
          value="ASC"
          onChange={ handleFilterChanges }
        />
        Crescente
      </label>
      <label htmlFor="DESC">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          id="DESC"
          name="sort"
          value="DESC"
          onChange={ handleFilterChanges }
        />
        Decrescente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => updateSortFilter(sortFilter) }
      >
        Ordenar
      </button>

    </>
  );
};

export default Sort;
