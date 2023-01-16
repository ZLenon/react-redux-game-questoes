export const actionLogin = (infoLogin) => ({
  type: 'ACTION_LOGIN',
  payload: infoLogin,
});

export const aumentarScore = (pontos) => ({
  type: 'ACTION_POINTS',
  payload: pontos,
});

export const clearScore = (score) => ({
  type: 'ACTION_CLEAR',
  payload: score,
});

export const actionResponse = (responseCode) => ({
  type: 'ACTION_RESPONSE',
  payload: responseCode,
});

export const actionData = (responseAPI) => ({
  type: 'ACTION_DATA',
  payload: responseAPI,
});
