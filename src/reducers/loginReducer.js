export const userDataInitialState = { user: null, token: "" };

const loginReducer = (userData, { type, user, token }) => {
    switch (type) {
        case "LOGIN":
            return {
                user: { userName: user.userName, userId: user.id },
                token: token
            };
        case "LOGOUT":
            return { user: null, token: "" };
        default:
            return { ...userData };
    }
};

export default loginReducer;