import { useContext, useEffect, useState } from 'react';
import { PlanetSearchContext } from '../context';
import { columnsProperties } from '../services';

const handleComparison = ({ column, comparison, value }) => {
  switch (comparison) {
  case 'maior que':
    return ({ [column]: entryValue }) => Number(entryValue) > Number(value);
  case 'menor que':
    return ({ [column]: entryValue }) => Number(entryValue) < Number(value);
  case 'igual a':
    return ({ [column]: entryValue }) => entryValue === value;
  default:
    return () => true;
  }
};

const FIRST_VALUE = -1;
const SECOND_VALUE = 1;

const handleSorting = ({ column, type }) => {
  switch (type) {
  case 'text':
    return ({ [column]: firstEntry }, { [column]: secondEntry }) => {
      if (firstEntry <= secondEntry) return FIRST_VALUE;
      return SECOND_VALUE;
    };
  case 'number':
    return ({ [column]: firstEntry }, { [column]: secondEntry }) => (
      firstEntry - secondEntry
    );
  case 'date':
    return ({ [column]: firstEntry }, { [column]: secondEntry }) => (
      Date.parse(firstEntry) - Date.parse(secondEntry)
    );
  case 'list':
    return ({ [column]: firstEntry }, { [column]: secondEntry }) => (
      firstEntry.length - secondEntry.length
    );
  default:
    return () => FIRST_VALUE;
  }
};

const filterByValues = (filters, data) => filters.reduce(
  (filteredData, filter) => filteredData.filter(handleComparison(filter)),
  data,
);

class SortData {
  constructor(data) {
    this.data = data;
    return this;
  }

  byColumn(column) {
    this.column = column;
    return this;
  }

  inOrder(order) {
    const isDescending = order === 'DESC';
    const type = columnsProperties[this.column];
    const unknownData = this.data.filter(({ [this.column]: data }) => data === 'unknown');
    const knownData = this.data.filter((data) => !unknownData.includes(data));
    const sortedData = knownData.sort(handleSorting({ column: this.column, type }));
    const output = isDescending ? sortedData.reverse() : sortedData;
    return [...output, ...unknownData];
  }
}

const sortData = (data) => new SortData(data);

const useFilters = () => {
  const {
    apiData,
    setPlanetsData,
    filters,
    data,
  } = useContext(PlanetSearchContext);

  useEffect(
    () => {
      const {
        filterByName: { name: typedName },
        filterByNumericValues,
        order: { column, sort },
      } = filters;
      const filteredData = apiData.filter(({ name }) => name.includes(typedName));
      const hasNumericFilters = filterByNumericValues.length > 0;
      const outputData = hasNumericFilters
        ? filterByValues(filterByNumericValues, filteredData)
        : filteredData;

      setPlanetsData(sortData(outputData).byColumn(column).inOrder(sort));
    },
    [filters, apiData, setPlanetsData],
  );
  return [data];
};

const useValuesFilterFields = () => {
  const INITIAL_STATE = { column: '', comparison: '', value: '0' };
  const [valuesFilter, setValuesFilter] = useState(INITIAL_STATE);

  const handleFilterChanges = ({ target: { name, value } }) => {
    setValuesFilter((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  return [valuesFilter, handleFilterChanges];
};

const useSortFilterFields = () => {
  const INITIAL_STATE = { column: 'name', sort: 'ASC' };
  const [sortFilter, setSortFilter] = useState(INITIAL_STATE);

  const handleFilterChanges = ({ target: { name, value } }) => {
    setSortFilter((currentFilters) => ({ ...currentFilters, [name]: value }));
  };

  return [sortFilter, handleFilterChanges];
};

export { useFilters, useValuesFilterFields, useSortFilterFields };
