/**
 * Save the token to local storage.
 *
 * @param {*} token
 */
export const setAuthToken = async (token) => {
  // Save the token in local storage
  localStorage.setItem('token', token);
};
/**
 * Get the token from local storage
 */
export const getAuthToken = () => {
  // Get the token from local storage
  return localStorage.getItem('token');
};
