import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { clearScore } from '../redux/action';

class FeedBack extends Component {
  componentDidMount() {
    const { name, email, score } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(email).toString()}`;

    const newPlayer = {
      name,
      score,
      picture,
    };

    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      ranking = [newPlayer];
    } else {
      ranking.push(newPlayer);
    }

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(clearScore(0));
    history.push('/');
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h1
          data-testid="h1-text"
        >
          FeedBack
        </h1>
        <h3
          data-testid="feedback-text"
        >
          { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
        </h3>
        <p>Acertos:</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p>Pontuação:</p>
        <p data-testid="feedback-total-score">{score}</p>
        <button
          type="button"
          onClick={ this.playAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.ranking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

FeedBack.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(FeedBack);
