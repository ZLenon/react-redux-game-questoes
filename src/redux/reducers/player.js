const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  responseAPI: {},
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_LOGIN':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'ACTION_POINTS':
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertion,
    };
  default: return state;
  }
};

export default playerReducer;
