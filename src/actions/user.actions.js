export const login = (username, token) => {
    console.log(" user action got token: " + token);
    return {
        type: 'LOGIN',
        username: username,
        token: token
    };
};
 
export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};
 
export const signup = (username, token) => {
    return (dispatch) => {
    };
};
