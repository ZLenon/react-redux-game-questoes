export const actionLogin = (infoLogin) => ({
  type: 'ACTION_LOGIN',
  payload: infoLogin,
});

export const mudancaPontuacao = (pontos) => ({
  type: 'PONTUACAO',
  payload: pontos,
});
