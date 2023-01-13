import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const { assertions } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <h3
          data-testid="feedback-text"
        >
          { assertions >= THREE ? 'Well Done!' : 'Could be better...' }
        </h3>
        <h4>FeedBack</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBack);
