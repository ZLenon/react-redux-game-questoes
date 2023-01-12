import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionData } from '../redux/action/index';
import pergutasRespostaApi from '../services/DATA';

class Game extends Component {
  async componentDidMount() {
    try {
      const { responseCode, dispatch } = this.props;
      const NUMBER = 3;
      const keyAcess = localStorage.getItem('token');
      if (responseCode === NUMBER || !keyAcess) return this.limpaRedireciona();
      const data = await pergutasRespostaApi(keyAcess);
      if (data.response_code === NUMBER) return this.limpaRedireciona();
      dispatch(actionData(data));
    } catch (error) {
      this.limpaRedireciona();
    }
  }

  limpaRedireciona = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Jogo</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  responseCode: state.user.responseCode,
});

Game.propTypes = {
  responseCode: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
