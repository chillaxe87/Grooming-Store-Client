export const userDataInitialState = { user: null, token: "" };

const loginReducer = (userData, action) => {
    switch (action.type) {
        case "LOGIN":
            return { 
                user:{userName: action.response.userName, userId: action.response.id},
                token: action.response.token
            };
        case "LOGOUT":
            return { user: null, token: "" };
        default:
            return { ...userData };
    }
};

export default loginReducer;