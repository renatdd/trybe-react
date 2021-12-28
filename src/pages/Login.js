import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmailAction } from '../actions';
import { WALLET_PATH } from '../paths';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.renderLogInForm = this.renderLogInForm.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  validateEmail(email) {
    const pattern = /\w+@\w+\.\w{2,3}/;
    return pattern.test(email);
  }

  validatePassword(password) {
    const minLength = 6;
    return password.length >= minLength;
  }

  updateEmail({ target: { value: email } }) {
    this.setState({ email });
  }

  updatePassword({ target: { value: password } }) {
    this.setState({ password });
  }

  signIn() {
    const { email } = this.state;
    const { dispatchEmail } = this.props;
    dispatchEmail(email);
    this.setState({ loggedIn: true });
  }

  renderLogInForm() {
    const { email, password } = this.state;
    const isLogInDisabled = !(
      this.validateEmail(email) && this.validatePassword(password)
    );
    return (
      <>
        <div>Login</div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Usuário"
          onChange={ this.updateEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ this.updatePassword }
        />
        <button
          type="button"
          disabled={ isLogInDisabled }
          onClick={ this.signIn }
        >
          Entrar
        </button>
      </>
    );
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <>
        { loggedIn && <Redirect to={ WALLET_PATH } /> }
        { this.renderLogInForm() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};
