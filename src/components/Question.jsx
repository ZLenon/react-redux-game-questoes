import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.css';
import { aumentarScore } from '../redux/action';

class Question extends Component {
  state = {
    isAnswered: false,
    timeLeft: 30,
    buttonsDisabled: false,
  };

  componentDidMount() {
    this.deletTimer();
  }

  deletTimer = () => {
    const umSegundo = 1000;
    const timerID = setInterval(() => {
      const { timeLeft } = this.state;
      const fim = 0;
      if (timeLeft === fim) {
        clearTimeout(timerID);
        this.perguntaRespondida();
      } else {
        this.setState({ timeLeft: timeLeft - 1 });
      }
    }, umSegundo);
  };

  criarBotoes = () => {
    const { numero, perguntas } = this.props;
    const { results } = perguntas;
    const { isAnswered, buttonsDisabled } = this.state;

    const botaoCerto = (
      <button
        type="button"
        value={ 1 }
        key={ 10 }
        data-testid="correct-answer"
        className={ (isAnswered) ? 'correto' : '' }
        onClick={ this.perguntaAcertada }
        disabled={ buttonsDisabled }
      >
        {results[numero].correct_answer}
      </button>
    );
    const todosBotoes = results[numero].incorrect_answers.map((e, i) => {
      const botao = (
        <button
          type="button"
          value={ 0 }
          key={ i }
          data-testid={ `wrong-answer-${i}` }
          className={ (isAnswered) ? 'errado' : '' }
          onClick={ this.perguntaRespondida }
          disabled={ buttonsDisabled }
        >
          {e}
        </button>);
      return botao;
    });

    todosBotoes.push(botaoCerto);
    const botoesRandomizados = this.shuffle(todosBotoes);
    return botoesRandomizados;
  };

  perguntaAcertada = () => {
    this.perguntaRespondida();

    const { timeLeft } = this.state;
    const { numero, perguntas, scoreState, assertionState, dispatch } = this.props;
    const { results } = perguntas;

    const dif = ['easy', 'medium', 'hard'];
    const base = 10;
    let score;

    dif.forEach((e, i) => {
      if (results[numero].difficulty === e) {
        score = scoreState + base + (timeLeft * (i + 1));
      }
    });

    const assertion = assertionState + 1;
    dispatch(aumentarScore({ score, assertion }));
  };

  perguntaRespondida = () => {
    this.setState({ isAnswered: true, buttonsDisabled: true });
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex],
        array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  resetQuestion = () => {
    const { timeLeft } = this.state;
    const { sendNumber } = this.props;
    this.setState({ isAnswered: false, buttonsDisabled: false });
    sendNumber();
    if (timeLeft === 0) {
      this.setState({
        timeLeft: 30,
      });
      this.deletTimer();
    } else {
      this.setState({
        timeLeft: 30,
      });
    }
  };

  redirectNext = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { numero, perguntas } = this.props;
    const { results } = perguntas;
    const { isAnswered, timeLeft } = this.state;
    const FOUR = 4;
    return (
      <div>
        {(Object.keys(perguntas).length > 0)
          ? (
            <form>
              <h1 data-testid="timer-question">{`timer ${timeLeft}`}</h1>
              <h2 data-testid="question-category">
                {results[numero].category}
              </h2>
              <h2 data-testid="question-text">
                {results[numero].question}
              </h2>
              <div data-testid="answer-options">
                {this.criarBotoes()}
              </div>
              {(isAnswered)
                ? (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ numero < FOUR ? this.resetQuestion : this.redirectNext }
                  >
                    Next
                  </button>)
                : ('')}
            </form>
          )
          : ('')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.requisition.responseAPI,
  scoreState: state.player.score,
  assertionState: state.player.assertions,
});

Question.propTypes = {
  sendNumber: PropTypes.func,
  history: PropTypes.func,
  numero: PropTypes.number,
  perguntas: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        type: PropTypes.string,
        difficulty: PropTypes.string,
        question: PropTypes.string,
        correct_answer: PropTypes.string,
        incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }),
  scoreState: PropTypes.number,
  assertionState: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Question);
