import React , { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import appointmentsReducer from '../reducers/appointmentsReducer';
import {initAppointments} from '../actions/appointmentsAction';
import { getAppointmentsFromDb } from '../server/appointments';
 
export const AppointmentsContext = createContext();

const AppointmentsContextProvider = (props) => {

    const [appointmentsState, appointmentsDispatch] = useReducer(appointmentsReducer, "")
    const history = useHistory();

    useEffect(() => {

        let isComponentExist = true;

        getAppointmentsFromDb().then(
            (appointmentsData) => {
                if (isComponentExist) {
                    appointmentsDispatch(initAppointments(appointmentsData));
                    console.log("context:")
                    console.log(appointmentsState)
                }
            },
            (err) => {
                if (err.message === "Appointments not found") {
                    history.push("/notfound");
                }
            }
        );

        return () => {
            isComponentExist = false;
        };
    },[history]);

    return (
        <AppointmentsContext.Provider value = { { appointmentsState, appointmentsDispatch } }>
            { props.children }
        </AppointmentsContext.Provider>
    )
}

export default AppointmentsContextProvider