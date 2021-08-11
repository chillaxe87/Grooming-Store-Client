import React, { useContext, useEffect, useState } from 'react';
import { AppointmentsContext } from '../../context/AppointmentsContext';

import AppointmentsTime from './AppointmentsTime'
import { abortAppointment } from '../../actions/appointmentsAction';


const AppointmentDetails = (props) => {

    const { appointmentDispatch } = useContext(AppointmentsContext)

    const onClickAbortAppointments = () => {
        appointmentDispatch(abortAppointment(props.appointment.id))
        props.setAppointmentDetails(null)
    }

    return (
        <div className="appointments__details">
            <div className="appointments__details-body">
                <button className="close__button" onClick={()=>props.setAppointmentDetails(null)}>x</button>
                <h3>Appointment Details</h3>
                <h4>Scheduled by: {props.appointment.owner.name}</h4>
                <h4><AppointmentsTime time={props.appointment.time}/></h4>
                <h4>Scheduled at:</h4>
                <div>
                    <button>Edit</button>
                    <button onClick={onClickAbortAppointments}>Abort</button>
                </div>
            </div>
        </div>
    );
}

export default AppointmentDetails