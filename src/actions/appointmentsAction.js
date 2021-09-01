export const addAppointment = (appointment) => ({
    type: "ADD_APPOINTMENT",
    appointment
})
export const deleteAppointment = (id) => ({
    type: "DELETE_APPOINTMENT",
    id
})
export const editAppointment = (appointment) => ({
    type: "EDIT_APPOINTMENT",
    appointment
})
export const initAppointments = (appointments) => ({
    type: "INIT_APPOINTMENT",
    appointments
})