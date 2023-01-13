const INITIAL_STATE = {
  responseAPI: {},
};

const requisitionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ACTION_RESPONSE':
    return {
      ...state,
      responseCode: action.payload,
    };
  case 'ACTION_DATA':
    return {
      ...state,
      responseAPI: action.payload,
    };
  default: return state;
  }
};

export default requisitionReducer;
