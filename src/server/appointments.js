import Axios from 'axios'

const DB_URL = process.env.REACT_APP_APPOINTMENTS_DB;

export const getAppointmentsFromDb = async () => {
    try{
        const res = await Axios.get(DB_URL);   
        const appointments = res.data;    
        console.log("Server")  
        console.log(appointments) 
        return appointments;
    }catch (err){
        console.log("error fetching appointments")
        console.log(err)
    }
}

export const postAppointmentInDb = async (appointment) => {
    try {
        const res = await Axios.post(
            DB_URL,
            { appointment},
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getAppointmentInDb = async (Id) => {
    try {
        const res = await Axios.get(
            DB_URL + Id,
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