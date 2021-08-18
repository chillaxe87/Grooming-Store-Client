import React, { useContext } from 'react';
import { AppointmentsContext } from '../../context/AppointmentsContext';

import AppointmentsTime from './AppointmentsTime'
import { abortAppointment, editAppointment } from '../../actions/appointmentsAction';
import AppointmentsTimeSelect from './AppointmentsTimeSelect';


const AppointmentDetails = (props) => {

    const { appointmentsDispatch } = useContext(AppointmentsContext)

    const onClickAbortAppointments = () => {
        appointmentsDispatch(abortAppointment(props.appointment.id))
        props.setAppointmentDetails(null)
    }

    const onClickEditAppointments = () => {
        appointmentsDispatch(editAppointment(props.appointment))
    }

    return (
        <div className="appointments__details">
            <div className="appointments__details-body">
                <button className="close__button" onClick={()=>props.setAppointmentDetails(null)}>x</button>              
                <h3>Appointment Details</h3>
                <div>
                    <h4>{props.appointment.owner.name}</h4>
                </div>
                <div> <AppointmentsTime time={props.appointment.time}/></div>
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