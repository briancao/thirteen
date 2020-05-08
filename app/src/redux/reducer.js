import { TOGGLE_TEST, GET_MOVIES } from "./actions";

const initialState = {
    testProperty: false,
    movies: [],
};

// arrow function requires a name
export default function (state = initialState, action) {
    const { type, data } = action;
    switch (type) {
        case TOGGLE_TEST:
            return { ...state, testProperty: !state.testProperty };
        case GET_MOVIES:
            return { ...state, movies: data };
        default:
            return state;
    }
}
