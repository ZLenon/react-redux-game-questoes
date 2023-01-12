import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Header.css';

class Header extends Component {
  render() {
    const { nameState, emailState, scoreState } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(emailState).toString()}` }
          alt="foto de perfil"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{ nameState }</h3>
        <h3 data-testid="header-score">{`Pontuação: ${scoreState}`}</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nameState: state.user.name,
  emailState: state.user.email,
  scoreState: state.user.score,
});

Header.propTypes = {
  nameState: PropTypes.string.isRequired,
  emailState: PropTypes.string.isRequired,
  scoreState: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
