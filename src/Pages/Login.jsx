import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requisicaoToken from '../services/API';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validation());
  };

  validation = () => {
    const { name, email } = this.state;
    const validName = name.length > 0;
    const validEmail = email.length > 0;
    const validBtn = validEmail && validName;
    this.setState({
      isButtonDisabled: !validBtn,
    });
  };

  handleClick = async () => {
    const { token } = await requisicaoToken();
    localStorage.setItem('token', token);
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="nome">
          <input
            id="nome"
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <Link to="/game">
          <button
            id="btn"
            data-testid="btn-play"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </Link>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Config
          </button>
        </Link>
      </form>
    );
  }
}

export default connect()(Login);
