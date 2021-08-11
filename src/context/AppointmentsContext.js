import React , { createContext, useReducer } from 'react';
import appointmentsReducer, { initialAppointmentsState } from '../reducers/appointmentsReducer';

export const AppointmentsContext = createContext();

const AppointmentsContextProvider = (props) => {

    const [appointmentState, appointmentDispatch] = useReducer(appointmentsReducer, initialAppointmentsState)

    return (
        <AppointmentsContext.Provider value = { { appointmentState, appointmentDispatch } }>
            { props.children }
        </AppointmentsContext.Provider>
    )
}

export default AppointmentsContextProvider