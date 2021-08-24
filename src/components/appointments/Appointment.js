import React from 'react';
import AppointmentsTime from './AppointmentsTime';


const Appointment = (props) => {

    const name = props.appointment.userName;

    return (
        <div className="appointment__container">
            <div>{name} </div>
            <AppointmentsTime time={props.appointment.scheduledFor}/>
            <button onClick={()=>props.setAppointmentDetails(props.appointment)}>Details</button>     
        </div>
    );
}

export default Appointment