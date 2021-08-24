import React, { useContext, useEffect, useReducer, useState } from 'react';
import Appointment from './Appointment';
import AppointmentDetails from './AppintmentsDetails';
import AppointmentAddForm from './AppointmentAddForm';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

const Appointments = () => {
  
    const history = useHistory();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isDateSortDown, setIsDateSortDown] = useState(true);
    const [isUserSortDown, setIsUserSortDown] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);
   
    const { appointmentsState } = useContext (AppointmentsContext)
    const [appointments, setAppointments] = useState([]);
    const [idZero, setIdZero] = useState("0");

    const { userData, dispatchUserData } = useContext(LoginContext);

    useEffect (() => {
        if(isDateSortDown){
            onClickSortByDate()
        }
        setAppointments(appointmentsState)
        console.log("Main")
        if(!!appointmentsState){
            console.log(appointmentsState)
        }
    },[appointmentsState.length, history, isNewForm, appointmentDetails]);

    const onClickSortByDate = () => {
        isDateSortDown? 
            setAppointments(appointments.sort(function(a, b){return Date(a).scheduledFor.getTime() - Date(b).scheduledFor.getTime()})):
            setAppointments(appointments.sort(function(a, b){return Date(b).scheduledFor.getTime() - Date(a).scheduledFor.getTime()}));
        
        // setAppointments(sortedAppointments);
        setIsDateSortDown(!isDateSortDown)
    }
    const onClickSortByName = () => {
        isUserSortDown?
            setAppointments(appointments.sort(function(a, b){ return a.userName.localeCompare(b.userName)})):
            setAppointments(appointments.sort(function(a, b){ return b.userName.localeCompare(a.userName)}));

        // setAppointments(sortedNames);
        setIsUserSortDown(!isUserSortDown)
    }
    const onClickNewForm = () => {
        setIsNewForm(!isNewForm);
    }

    return (
        <div className="appointment-container">                     
            <div className="appointment">
                <div className="appointment-title">Appointments Schedule</div>  
                <div className="appointment-func">
                    <div onClick={onClickSortByName}>Name <i className={isUserSortDown ? "arrow up" : "arrow down" }></i></div>
                    <div onClick={onClickSortByDate}>Date <i className ={isDateSortDown ? "arrow up" : "arrow down" }></i></div>
                    { userData.user && <div className="add-appointment" onClick={onClickNewForm}>Add</div>}
                </div>
                {appointments.length !== 0 && appointments.map((appointment) => (
                    <Appointment 
                        key = {appointment.id}
                        appointment={appointment}
                        setAppointmentDetails={setAppointmentDetails}
                    />
                ))}  
                {
                    !!appointmentDetails && <AppointmentDetails 
                        appointment = {appointmentDetails}
                        setAppointmentDetails = {setAppointmentDetails}
                    />
                }
                {
                    isNewForm && <AppointmentAddForm 
                        onClickNewForm={onClickNewForm}
                        setAppointments={setAppointments}
                        idZero={idZero}
                    />
                }             
            </div> 
        </div>
    );
}

export default Appointments