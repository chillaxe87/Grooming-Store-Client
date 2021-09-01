export const loginAction = ({token, user}) => ({
    type: "LOGIN",
    token,
    user
});

export const logoutAction = () => ({
    type: "LOGOUT"
});