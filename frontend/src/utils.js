export const getError = (error) => {
  return error && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const getRandomProducts = (prodsArray, n) => {
  return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}