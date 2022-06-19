
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Get the token from local storage
 */
export const endpoint = isProduction == 'production' ? 'https://api.example.com' : 'http://127.0.0.1:8000/api/';

export const url = (route) => {
    return endpoint + route;
};
