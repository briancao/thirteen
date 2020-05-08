import React from "react";
import { connect } from "react-redux";
import { toggleTest, getMovies } from "../redux/actions";
import { bindActionCreators } from "redux";

function Toggle({ testProperty, toggleTest, getMovies }) {
    return (
        <div>
            {testProperty && "TEST MESSAGE"}
            <button onClick={toggleTest}>Toggle Me</button>
            <button onClick={getMovies}>Load Movies</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    testProperty: state.testReducer.testProperty,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ toggleTest, getMovies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
