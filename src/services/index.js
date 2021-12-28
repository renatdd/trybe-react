const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const fetchPlanetsData = async () => (
  fetch(API_URL).then((response) => response.json())
);

export const makeOptionsObjectFrom = (valuesArray, snakeCaseValue = false) => {
  const keys = ['value', 'key', 'name'];
  return valuesArray.map((value) => {
    const entries = keys.map((key) => {
      if (snakeCaseValue && key === 'value') {
        const newValueName = value.toLowerCase().split(' ').join('_');
        return [key, newValueName];
      }
      return [key, value];
    });
    return Object.fromEntries(entries);
  });
};

export const makePropObjectWith = (keysArray, valuesArray) => {
  const entriesArray = keysArray.map((key, index) => [key, valuesArray[index]]);
  return Object.fromEntries(entriesArray);
};

export const columnsProperties = {
  name: 'text',
  rotation_period: 'number',
  orbital_period: 'number',
  diameter: 'number',
  climate: 'text',
  gravity: 'text',
  terrain: 'text',
  surface_water: 'number',
  population: 'number',
  films: 'list',
  created: 'date',
  edited: 'date',
  url: 'text',
};

export const COLUMNS_NAMES = [
  'Name',
  'Rotation period',
  'Orbital period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];
Object.keys(columnsProperties);
