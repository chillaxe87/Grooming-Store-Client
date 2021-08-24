import React, { useState, useContext } from 'react'
import { addAppointment, editAppointment } from '../../actions/appointmentsAction';
import { nanoid } from "nanoid";
import AppointmentsTimeSelect from './AppointmentsTimeSelect';
import {postAppointmentInDb} from '../../server/appointments';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';



const AppointmentAddForm = (props) => {

    const { userData, dispatchUserData } = useContext(LoginContext);
    const history = useHistory();
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [minutes, setMinutes] = useState("");
    const [isformValid, setIsFormValid] = useState(true)

    const [dateAndTime, setDateAndTime] = useState(null)

    const onClickAddNewSchedule = async (event) => {
        event.preventDefault();
        const csTime = new Date(year, month, day, hour, minutes)
        let currentTime = new Date()
        console.log(csTime)
         
        let appointment = {
            id: 0,
            userName: userData.user.userName,
            userId: userData.user.id,
            scheduledFor: csTime,
            scheduledAt: currentTime,
        }
        await postAppointmentInDb(JSON.stringify(appointment))
        history.push('/')
        props.onClickNewForm();
    }

    const onChangeDate = (event) => {
        event.preventDefault();
        const newDate = event.target.value.split('-');

        setYear(newDate[0]);
        setMonth(newDate[1]);
        setDay(newDate[2]);

        let date = new Date(newDate[0], newDate[1] - 1, newDate[2], hour, minutes)
        setDateAndTime(date)

        isFormValid()
    }
    const onChangeTime = (event) => {
        event.preventDefault();
        const newTime = event.target.value.split(':');
        setHour(newTime[0])
        setMinutes(newTime[1])

        setDateAndTime(new Date(year, month, day, hour, minutes))

        isFormValid()

    }

    const isFormValid = () => {
        let current = new Date()
     
        if(dateAndTime != null ){
            if (dateAndTime > current){
                setIsFormValid(false)
                return 
            }
        }
        setIsFormValid(true);
    }


    return (
        <div className="appointments__add">
            <div className="appointments__add-body">
                <h3>{props.idZero === "0" ? "Schedule New Appointment" : "Edit Time"}</h3>
                <form onSubmit={onClickAddNewSchedule}>
                    <button className="close__button" onClick={props.onClickNewForm}>x</button>
                    <label>Date: </label>
                    <input type="date" onChange={onChangeDate} />
                    <label htmlFor="hour">Time: </label>
                    <AppointmentsTimeSelect onChangeTime={onChangeTime} />
                    <button type="submit" className="form__button" disabled={isformValid}>{props.idZero === "0" ? "Schedule" : "Edit"}</button>
                </form>
            </div>
        </div>
    )
}
export default AppointmentAddForm