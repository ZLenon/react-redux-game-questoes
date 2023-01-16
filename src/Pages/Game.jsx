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
      // this.limpaRedireciona();
    }
    this.setState({ questionDisabled: false });
  }

  limpaRedireciona = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  sendNumber = () => {
    const { numeroQuestao } = this.state;

    this.setState({
      numeroQuestao: numeroQuestao + 1,
    });
  };

  render() {
    const { numeroQuestao, questionDisabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Question
          numero={ numeroQuestao }
          disabled={ questionDisabled }
          sendNumber={ this.sendNumber }
          history={ history }
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  responseCode: state.requisition.responseCode,
});

Game.propTypes = {
  history: PropTypes.func,
  responseCode: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
