export const userDataInitialState = { id: "", userName: "", token: "" };

const loginReducer = (userData, { type, id, userName, token }) => {
    switch (type) {
        case "LOGIN":
            return {
                userName: userName,
                userId: id,
                token: token
            };
        case "LOGOUT":
            return {
                userId: "",
                userName: "",
                token: ""
            };
        default:
            return { ...userData };
    }
};

export default loginReducer;