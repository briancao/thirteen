

const initialState = {
  cards: [],
  set: [],
  opponent: [],
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_CARDS':
      return { ...state, cards: data };
    case 'UPDATE_SET':
      console.log(data);
      return { ...state, set: data };
    default:
      return state;
  }
}
