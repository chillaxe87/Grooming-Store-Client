import React, { useContext, useEffect, useState } from 'react';
import Appointment from './Appointment';
import AppointmentDetails from './AppintmentsDetails';
import AppointmentAddForm from './AppointmentAddForm';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { getAppointmentsFromDb } from '../../server/appointments';

const Appointments = () => {
  
    const history = useHistory();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isDateSortDown, setIsDateSortDown] = useState(true);
    const [isUserSortDown, setIsUserSortDown] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);
   
    const { appointmentsState } = useContext (AppointmentsContext)
    const [appointments, setAppointments] = useState([]);
    const [idZero, setIdZero] = useState("0");

    const { userData } = useContext(LoginContext);

    useEffect (() => {
        if(isDateSortDown){
            onClickSortByDate()
        }
        setAppointments(appointmentsState)
        return (() => setAppointments([]))
    },[appointmentsState.length, history, isNewForm, appointmentDetails]);


    const onClickSortByDate = () => {
        appointments.reverse();
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
        if(!!userData.user){
            setIsNewForm(!isNewForm);
        } else {
            history.push('/login')
        }

    }

    const onClickNextPage = () => {
        const params = new URLSearchParams(window.location.search)
        const page = params.has("page") ? parseInt(params.get("page")) + 1 : 2
        history.push('/Appointments?page=' + page)
        window.location.reload(false);
    }
    const onClickBackPage = () => {
        const params = new URLSearchParams(window.location.search)
        const page = params.has("page") ? parseInt(params.get("page")) -1 : 1
        history.push('/Appointments?page=' + (page < 1 ? 1 : page))
        window.location.reload(false);

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
                <div className="nav__button">
                    <button onClick={onClickBackPage}>back</button> <button onClick={onClickNextPage} disabled = {appointments.length < 18}>next</button>
                </div>       
            </div> 
        </div>
    );
}

export default Appointments