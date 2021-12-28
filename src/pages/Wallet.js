import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewExpenseForm from '../components/NewExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const expensesTotal = expenses.reduce(
      (
        total,
        { value, currency, exchangeRates },
      ) => total + value * exchangeRates[currency].ask,
      0,
    ).toFixed(2);

    return (
      <>
        <header>
          <div>TrybeWallet</div>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">{ expensesTotal }</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <main>
          <NewExpenseForm />
          <ExpensesTable />
        </main>
      </>
    );
  }
}

const mapStateToProps = (
  { user: { email }, wallet: { expenses } },
) => ({ email, expenses });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Wallet.defaultProps = {
  email: 'Não identificado',
  expenses: [],
};
