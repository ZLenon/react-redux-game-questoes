import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionData } from '../redux/action/index';
import pergutasRespostaApi from '../services/DATA';
import Question from '../components/Question';

class Game extends Component {
  state = {
    numeroQuestao: 0,
    questionDisabled: true,
  };

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
    this.setState({ questionDisabled: false });
  }

  limpaRedireciona = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  render() {
    const { numeroQuestao, questionDisabled } = this.state;
    return (
      <div>
        <Header />
        <Question numero={ numeroQuestao } disabled={ questionDisabled } />
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
