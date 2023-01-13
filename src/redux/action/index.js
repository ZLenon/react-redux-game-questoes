export const actionLogin = (infoLogin) => ({
  type: 'ACTION_LOGIN',
  payload: infoLogin,
});

export const aumentarScore = (pontos) => ({
  type: 'ACTION_POINTS',
  payload: pontos,
});

export const actionResponse = (responseCode) => ({
  type: 'ACTION_RESPONSE',
  payload: responseCode,
});

export const actionData = (responseAPI) => ({
  type: 'ACTION_DATA',
  payload: responseAPI,
});

/* export const actionApi = () => ( */
/*   async (dispatch) => { */
/*     try { */
/*       const exchange = await requisicaoToken(); */
/*       dispatch({ */
/*         type: CHANGE_EXCHANGE, */
/*         payload: Object.keys(exchange), */
/*       }); */
/*     } catch (error) { */
/*       dispatch(); */
/*     } */
/*   } */
/* ); */
