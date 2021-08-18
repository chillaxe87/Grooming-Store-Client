import React from 'react';
import AppointmentsTime from './AppointmentsTime';


const Appointment = (props) => {

    const name = props.appointment.owner.name;

    return (
        <div className="appointment__container">
            <div>{name} </div>
            <AppointmentsTime time={props.appointment.time}/>
            <button onClick={()=>props.setAppointmentDetails(props.appointment)}>Details</button>     
        </div>
    );
}

export default Appointment