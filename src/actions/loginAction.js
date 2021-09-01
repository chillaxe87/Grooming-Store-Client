export const loginAction = ({ id, userName, token }) => ({
    type: "LOGIN",
    id,
    userName,
    token
});

export const logoutAction = () => ({
    type: "LOGOUT"
});