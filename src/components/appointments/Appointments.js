import React, { useContext, useEffect, useReducer, useState } from 'react';
import Appointment from './Appointment';
import AppointmentDetails from './AppintmentsDetails';
// import { nanoid } from 'nanoid';
import AppointmentAddForm from './AppointmentAddForm';
import appointmentsReducer, { initialAppointmentsState } from '../../reducers/appointmentsReducer';
import { AppointmentsContext } from '../../context/AppointmentsContext';
// import { addAppointment, editAppointment } from '../../actions/appointmentsAction';
// import { useHistory } from 'react-router-dom';


const Appointments = () => {

    // const history = useHistory();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isDateSortDown, setIsDateSortDown] = useState(true);
    const [isUserSortDown, setIsUserSortDown] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);
   


    const { appointmentsState } = useContext (AppointmentsContext)
    const [appointments, setAppointments] = useReducer(appointmentsReducer, initialAppointmentsState);
    const [appointmentsToDisplay, setAppointmentsToDisplay] = useState(appointmentsState)


    useEffect (() => {
        if(isDateSortDown){
            onClickSortByDate()
        }
        console.log("Main")
        console.log(appointmentsToDisplay)
    },[]);

    const onClickSortByDate = () => {
        isDateSortDown? 
            setAppointments(appointments.sort(function(a, b){return a.time.getTime() - b.time.getTime()})):
            setAppointments(appointments.sort(function(a, b){return b.time.getTime() - a.time.getTime()}));
        
        // setAppointments(sortedAppointments);
        setIsDateSortDown(!isDateSortDown)
    }
    const onClickSortByName = () => {
        isUserSortDown?
            setAppointments(appointments.sort(function(a, b){ return a.owner.name.localeCompare(b.owner.name)})):
            setAppointments(appointments.sort(function(a, b){ return b.owner.name.localeCompare(a.owner.name)}));

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
                    <div className="add-appointment" onClick={onClickNewForm}>Add</div>
                </div>
                {appointments.map((appointment) => (
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
                    />
                }             
            </div> 
        </div>
    );
}

export default Appointments