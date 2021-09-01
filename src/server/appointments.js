import Axios from 'axios'

const DB_URL = process.env.REACT_APP_APPOINTMENTS_DB;
var controller = new AbortController();
export const getAppointmentsFromDb = async (query) => {
    const params = query
    try {
        const res = await Axios.get(DB_URL + params);
        const appointments = res.data;
        return appointments;

    } catch (err) {
        console.log("error fetching appointments")
        console.log(err)
    }
}

export const postAppointmentInDb = async (appointment, token) => {

    const newAppointment = JSON.parse(appointment)
    try {
        const res = await Axios.post(
            DB_URL,
            newAppointment,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("post server:")
        console.log(res)
        return res;
    } catch (err) {
        console.log(err);
    }
    controller.abort()
}

export const putAppointmentInDb = async (appointment, token) => {
    const newAppointment = JSON.parse(appointment)
    const authAxios = Axios.create({
        baseURL: DB_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    try {
        const res = await authAxios.put(
            DB_URL + "/" + newAppointment.id,
            newAppointment
        );
        return res;
    } catch (err) {
        console.log(err);
    }
    controller.abort()
}


export const getAppointmentInDb = async (Id) => {
    try {
        const res = await Axios.get(
            DB_URL + "/" + Id,
        )
        if (!res.data) {
            throw new Error("appointment not found");
        }
        return (
            res.data
        );
    } catch (err) {
        throw err;
    }
};

export const deleteAppointmentFromDb = async (Id, token) => {
    const authAxios = Axios.create({
        baseURL: DB_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    try {
        const res = await authAxios.delete(
            DB_URL + "/" + Id,
        )
        if (!res.data) {
            throw new Error("appointment not found");
        }
        return (
            res.data
        )
    } catch (err) {
        console.log(err);
    }
    controller.abort()
}
