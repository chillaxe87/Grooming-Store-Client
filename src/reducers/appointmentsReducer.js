
let index = 0;

const appointmentsReducer = (appointments, action) => {
    index = -1
    switch (action.type) {
        case "ADD_APPOINTMENT":
            return [...appointments, action.appointments]
        case "INIT_APPOINTMENT": {
            if (!!action.appointments) {
                return [...action.appointments]
            }
            return [...appointments]
        }
        case "EDIT_APPOINTMENT":
            console.log("Edit")
            console.log(action.appointment)

            index = appointments.findIndex(e => e.id === action.appointment.id)
            appointments[index] = action.appointment
            return [...appointments];

        case "DELETE_APPOINTMENT":
            let newAppointments = [...appointments]
            index = newAppointments.findIndex(a => a.id === action.id)
            return [...appointments.splice(index, 1)]
        default:
            return [...appointments];
    }
}

export default appointmentsReducer