import Axios from 'axios'

const DB_URL = process.env.REACT_APP_APPOINTMENTS_DB;

export const getAppointmentsFromDb = async () => {
    const params = new URLSearchParams(window.location.search)
    let page = params.has("page") ? params.get("page") : 1
    try{
        const res = await Axios.get(DB_URL + "?page=" + page);   
        const appointments = res.data;    
        return appointments;
    }catch (err){
        console.log("error fetching appointments")
        console.log(err)
    }
}

export const postAppointmentInDb = async (appointment, token ) => {
 
    const authAxios = Axios.create({
        baseURL: DB_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const newAppointment = JSON.parse(appointment)
    try {
        const res = await authAxios.post(
            DB_URL,
            newAppointment,
        );

        return res.data;
    } catch (err) {
        console.log(err);
    }
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
            DB_URL+"/" + newAppointment.id,
            newAppointment
        );

        return res.data;
    } catch (err) {
        console.log(err);
    }
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
            Authorization: `Bearer ${token}`
        }
    })
    try{
        const res = await authAxios.delete(
            DB_URL + "/" + Id,
        )
        if(!res.data){
            throw new Error("appointment not found");
        }
        return (
            res.data
        )
    } catch (err) {
        console.log(err);
    }
}


// export const getAppointmentsFromDb = async () => {
//     return new Promise(async (resolve, reject) => {
//         try{
//             const res = await Axios.get(DB_URL);   
//             const appointments = res.data;       
//             resolve(appointments);
//         }catch (err){
//             console.log("error fetching appointments");
//             console.log(err);
//             reject(err);
//         }
//     });
// }