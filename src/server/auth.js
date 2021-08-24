import Axios from 'axios'

export const registerToSite = async (email, userName, password) => {
    try {
        const user = { email, userName , password}
        console.log(process.env.REACT_APP_REGISTER)
        const res = await Axios.post(process.env.REACT_APP_REGISTER, user)
        console.log(res)
        return {
            token: res.data.token,
            user: {userName: res.data.userName, id: res.data.id}
        };
    } catch (err) {
        throw new Error(err);
    }
};

export const loginToSite = async (email, password) => {
    try {
        
        const user = { email, password}
        console.log(process.env.REACT_APP_LOGIN)
        const res = await Axios.post(process.env.REACT_APP_LOGIN, user)
        return {
            token: res.data.token,
            user: {userName: res.data.userName, id: res.data.id}
        };
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}