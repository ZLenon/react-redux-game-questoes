const pergutasRespostaApi = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default pergutasRespostaApi;
