import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearScore } from '../redux/action';

class Ranking extends Component {
  createRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (ranking !== null) {
      ranking.sort((a, b) => b.score - a.score);

      const rankings = ranking.map((e, i) => {
        const player = (
          <tr key={ i }>
            <td>
              <img
                src={ e.picture }
                alt="foto de perfil"
              />
            </td>
            <td data-testid={ `player-name-${i}` }>{e.name}</td>
            <td data-testid={ `player-score-${i}` }>{e.score}</td>
          </tr>);
        return player;
      });

      return rankings;
    }

    return ([]);
  };

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(clearScore(0));
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.playAgain }
        >
          Inicio
        </button>
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.createRanking()}</tbody>
        </table>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Ranking);
