export const getError = (error) => {
  return error && error.response.data.message
    ? error.response.data.message
    : error.message;
};
