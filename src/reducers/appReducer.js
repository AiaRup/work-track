export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: payload
      };
    default:
      return state;
  }
};
