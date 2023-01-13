import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { score, assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h1>FeedBack</h1>
        <h3
          data-testid="feedback-text"
        >
          { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
        </h3>
        <p>Acertos:</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p>Pontuação:</p>
        <p data-testid="feedback-total-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

FeedBack.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
