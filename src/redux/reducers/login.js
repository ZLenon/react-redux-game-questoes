import { ACTION_LOGIN } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default: return state;
  }
};
export default login;
