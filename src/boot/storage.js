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

/**
 * Save the user info
 *
 * @param {*} user
 */
export const setUserInfo = async (user) => {
    // Save the user info in local storage
    localStorage.setItem('user_info', JSON.stringify(user));
};

/**
 * Return the user info from local storage
 *
 * @returns User info
 */
export const getUserInfo = () => {
    // Get the token from local storage
    return JSON.parse(localStorage.getItem('user_info'));
};
