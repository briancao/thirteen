const initialState = {
    testProperty2: false,
};

// arrow function requires a name
export default function (state = initialState, action) {
    const { type } = action;
    switch (type) {
        case "TOGGLE_TEST":
            return { ...state, testProperty2: !initialState };
        default:
            return state;
    }
}
