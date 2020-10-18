//user
const initialState = {
  user: {
    id: '',
    username: '',
    guest: false,
  },
};

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_USER':
      return { ...state, user: data };
    default:
      return state;
  }
}
