import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';
import Loading from './Loading';
import { useFilters } from '../hooks';
import { COLUMNS_NAMES } from '../services';

const renderInnerLines = (lineValue, index) => (
  <p key={ `line-${index}` }>
    { lineValue }
  </p>
);

const renderRow = (rowData) => {
  delete rowData.residents;
  const rowEntries = Object.entries(rowData);
  return (
    <tr key={ rowData.name }>
      { rowEntries.map(([cellName, cellValue]) => {
        const haveMultipleLines = cellName === 'films';
        const isNameColumn = cellName === 'name';
        return (
          <td key={ cellName } { ...isNameColumn && { 'data-testid': 'planet-name' } }>
            {
              haveMultipleLines
                ? cellValue.map(renderInnerLines)
                : cellValue
            }
          </td>
        );
      })}
    </tr>
  );
};

const renderTableFor = (data) => {
  const hasNoResults = data.length === 0;
  if (hasNoResults) return <p>Nenhum resultado encontrado</p>;

  return (
    <table>
      <thead>
        <tr>
          { COLUMNS_NAMES.map((name) => <th key={ name }>{ name }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map(renderRow) }
      </tbody>
    </table>
  );
};

const Table = () => {
  const { isFetchingPlanets } = useContext(PlanetSearchContext);
  const [data] = useFilters();

  if (isFetchingPlanets) return (<Loading />);
  return (
    <div>
      { renderTableFor(data) }
    </div>
  );
};

export default Table;
