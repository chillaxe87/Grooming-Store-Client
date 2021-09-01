import React, { useContext, useEffect, useState } from 'react';
import AppointmentsTime from './AppointmentsTime';
import { LoginContext } from '../../context/LoginContext';


const Appointment = ({ appointment, setAppointmentDetails }) => {

    const { userData } = useContext(LoginContext);
    const [isYourAppointment, setisYourAppointment] = useState(false)
    const name = appointment.userName;

    useEffect(() => {
        if (userData.userName !== "") {
            setisYourAppointment(userData.id === appointment.userId)
        }

        return (() => setisYourAppointment(false))
    }, [userData.id, appointment.userId, userData.userName])


    return (
        <div className="appointment__container">
            <div>{name} </div>
            <AppointmentsTime time={appointment.scheduledFor} />
            {isYourAppointment && <button onClick={() => setAppointmentDetails(appointment)}>Details</button>}
        </div>
    );
}

export default Appointment