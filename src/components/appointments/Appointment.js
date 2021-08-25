import React, {useContext, useEffect, useState} from 'react';
import AppointmentsTime from './AppointmentsTime';
import { LoginContext } from '../../context/LoginContext';


const Appointment = (props) => {

    const { userData } = useContext(LoginContext);
    const [isYourAppointment, setisYourAppointment] = useState("")

    useEffect (() => {
        if(!userData.user){
            setisYourAppointment(false)
        } else{
            setisYourAppointment(userData.user.id === props.appointment.userId)
        }
        return (()=>setisYourAppointment(""))
    },[userData.user])
    const name = props.appointment.userName;

    return (
        <div className="appointment__container">
            <div>{name} </div>
            <AppointmentsTime time={props.appointment.scheduledFor}/>
            {isYourAppointment && <button onClick={()=>props.setAppointmentDetails(props.appointment)}>Details</button> }
        </div>
    );
}

export default Appointment