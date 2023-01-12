import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.css';

class Question extends Component {
  state = {
    isAnswered: false,
  };

  criarBotoes = () => {
    const { numero, perguntas } = this.props;
    const { results } = perguntas;
    const { isAnswered } = this.state;

    const botaoCerto = (
      <button
        type="button"
        value={ 1 }
        key={ 10 }
        data-testid="correct-answer"
        className={ (isAnswered) ? 'correto' : '' }
        onClick={ this.answerClick }
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
          onClick={ this.answerClick }
        >
          {e}
        </button>);
      return botao;
    });

    todosBotoes.push(botaoCerto);
    const botoesRandomizados = this.shuffle(todosBotoes);
    return botoesRandomizados;
  };

  answerClick = () => {
    this.setState({ isAnswered: true });
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

  render() {
    const { numero, perguntas } = this.props;
    const { results } = perguntas;
    const { isAnswered } = this.state;
    return (
      <div>
        {(Object.keys(perguntas).length > 0)
          ? (
            <form>
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
                ? (<button type="button" data-testid="btn-next">Next</button>) : ('')}
            </form>
          )
          : ('')}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.user.responseAPI,
});

Question.propTypes = {
  numero: PropTypes.number.isRequired,
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
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps)(Question);
