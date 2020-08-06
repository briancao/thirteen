import React from 'react';
import { connect } from 'react-redux';
import { toggleTest, getMovies } from '../redux/example/actions';
import { bindActionCreators } from 'redux';

function Toggle({ testProperty, toggleTest, getMovies }) {
  return (
    <div>
      {testProperty}
      {testProperty && 'TEST MESSAGE'}
      <button onClick={toggleTest}>Toggle Me</button>
      <button onClick={getMovies}>Load Movies</button>
    </div>
  );
}

export default connect(
  (state) => ({
    testProperty: state.testReducer.testProperty,
  }),
  (dispatch) => bindActionCreators({ toggleTest, getMovies }, dispatch),
)(Toggle);
