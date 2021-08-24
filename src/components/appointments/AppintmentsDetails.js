import React, { useContext } from 'react';
import { AppointmentsContext } from '../../context/AppointmentsContext';

import AppointmentsTime from './AppointmentsTime'
import { abortAppointment, editAppointment } from '../../actions/appointmentsAction';
import AppointmentsTimeSelect from './AppointmentsTimeSelect';
import {deleteAppointmentFromDb, getAppointmentInDb} from '../../server/appointments'
import { useHistory } from 'react-router-dom';

const AppointmentDetails = (props) => {
 
    const history = useHistory()
    const { appointmentsDispatch } = useContext(AppointmentsContext)

    const onClickAbortAppointments = async () => {
        await deleteAppointmentFromDb(props.appointment.id);
        history.push("/")
        props.setAppointmentDetails(null)
    }

    const onClickEditAppointments = () => {
        console.log("Edit")
        console.log(props.appointment)
        appointmentsDispatch(editAppointment(props.appointment))
    }

    return (
        <div className="appointments__details">
            <div className="appointments__details-body">
                <button className="close__button" onClick={()=>props.setAppointmentDetails(null)}>x</button>              
                <h3>Appointment Details</h3>
                <div>
                    <h4>{props.appointment.userName}</h4>
                </div>
                <div> <AppointmentsTime time={props.appointment.scheduledFor}/></div>
                <form>
                    <input type="date"/>
                    <AppointmentsTimeSelect />
                </form>
                <div className="buttons">
                    <button onClick={onClickEditAppointments}>Edit</button>
                    <button onClick={onClickAbortAppointments}>Abort</button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetails