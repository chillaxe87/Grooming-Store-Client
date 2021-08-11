export const addAppointment = (appointment) => ({
    type: "ADD_APPOINTMENT",
    appointment
})
export const abortAppointment = (index) => ({
    type: "ABORT_APPOINTMENT",
    index
})
export const editApointment = (appointment) => ({
    type: "EDIT_APPOINTMENT",
    appointment
})
export const sortApointments = (appointments) => ({
    type: "SORT_APPOINTMENT",
    appointments
})