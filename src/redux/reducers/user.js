const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_LOGIN':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case 'ACTION_RESPONSE':
    return {
      ...state,
      responseCode: action.payload,
    };
  case 'ACTION_DATA':
    return {
      ...state,
      responseAPi: action.payload,
    };
  default: return state;
  }
};

export default userReducer;
