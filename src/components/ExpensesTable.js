import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction, editExpenseAction } from '../actions';

class ExpensesTable extends React.Component {
  static getTotalValue({ value, exchangeRates, currency }) {
    return (parseFloat(value) * parseFloat(exchangeRates[currency].ask)).toFixed(2);
  }

  static getCurrencyName({ exchangeRates, currency }) {
    return exchangeRates[currency].name;
  }

  static getCurrencyExchange({ exchangeRates, currency }) {
    return parseFloat(exchangeRates[currency].ask).toFixed(2);
  }

  getCellValue(cellPropName, expense) {
    switch (cellPropName) {
    case 'convertedValue':
      return ExpensesTable.getTotalValue(expense);
    case 'currency':
      return ExpensesTable.getCurrencyName(expense);
    case 'ask':
      return ExpensesTable.getCurrencyExchange(expense);
    case 'conversionCurrency':
      return 'Real';
    default:
      return expense[cellPropName];
    }
  }

  renderHeader() {
    const fields = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <thead>
        <tr>
          { fields.map((fieldName) => (
            <td role="cell" key={ fieldName }>{ fieldName }</td>
          ))}
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { expenses, removeExpense, editExpense } = this.props;
    const cellsPropNames = [
      'description',
      'tag',
      'method',
      'value',
      'currency',
      'ask',
      'convertedValue',
      'conversionCurrency',
    ];
    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            { cellsPropNames.map((cellPropName) => (
              <td key={ `${expense.id}-${cellPropName}` }>
                { this.getCellValue(cellPropName, expense) }
              </td>
            )) }
            <td key={ `${expense.id}-buttons` }>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpense(expense) }
              >
                X
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => editExpense(expense) }
              >
                Editar
              </button>
            </td>
          </tr>
        )) }
      </tbody>
    );
  }

  render() {
    return (
      <table>
        { this.renderHeader() }
        { this.renderBody() }
      </table>
    );
  }
}

const mapStateToProps = (
  { wallet: { expenses } },
) => ({ expenses });

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpenseAction(expense)),
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

ExpensesTable.defaultProps = {
  expenses: [],
};
