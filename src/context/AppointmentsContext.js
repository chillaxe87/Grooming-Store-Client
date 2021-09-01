import React, { createContext, useReducer } from 'react';
import appointmentsReducer from '../reducers/appointmentsReducer';

export const AppointmentsContext = createContext();

const AppointmentsContextProvider = (props) => {

    const [appointmentsState, appointmentsDispatch] = useReducer(appointmentsReducer, "")

    return (
        <AppointmentsContext.Provider value={{ appointmentsState, appointmentsDispatch }}>
            {props.children}
        </AppointmentsContext.Provider>
    )
}

export default AppointmentsContextProvider