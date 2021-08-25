import React, { useState, useContext } from 'react'
import AppointmentsTimeSelect from './AppointmentsTimeSelect';
import {postAppointmentInDb, putAppointmentInDb} from '../../server/appointments';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';



const AppointmentAddForm = (props) => {

    const { userData } = useContext(LoginContext);
    const history = useHistory();
    const [date, setDate] = useState(["", "", ""]);
    const [time, setTime] = useState(["", ""]);
    const [isformValid, setIsFormValid] = useState(true);
    const [isDateTakenMessage, setIsDateTakenMessage] = useState("");

    const [dateAndTime, setDateAndTime] = useState(null)

    const onClickAddNewSchedule = async (event) => {

        event.preventDefault();
        setIsFormValid(true);
        const csTime = new Date(date[0], date[1], date[2], time[0], time[1])
        let currentTime = new Date()

        if(props.idZero === "0"){      
            let appointment = {
                id: 0,
                userName: userData.user.userName,
                userId: userData.user.id,
                scheduledFor: csTime,
                scheduledAt: currentTime,
            }
            const res = await postAppointmentInDb(JSON.stringify(appointment), userData.token)
            console.log(res)
            if(!res.status == 201){
                setIsDateTakenMessage(res)
            } else {
                history.push('/')
                props.onClickNewForm();
            }
        } else{
            let appointment = {
                id: props.idZero,
                userName: userData.user.userName,
                userId: userData.user.id,
                scheduledFor: csTime,
                scheduledAt: currentTime,
            }
            const res = await putAppointmentInDb(JSON.stringify(appointment), userData.token)
            console.log(res)
            if(!res.status == 200){
                setIsDateTakenMessage(res)
            } else {
                alert("updated")
                history.push('/')
            }
        }      
    }

    const onChangeDate = (event) => {
        event.preventDefault();
        const newDate = event.target.value.split('-');

        setDate([newDate[0], newDate[1] - 1,newDate[2]])

        let date = new Date(newDate[0], newDate[1], newDate[2], time[0], time[1])
        setDateAndTime(date)
        isFormValid()
    }

    const onChangeTime = (event) => {
        event.preventDefault();
        const newTime = event.target.value.split(':');
        setTime([newTime[0], newTime[1]])
        setDateAndTime(new Date(date[0], date[1], date[2], time[0], time[1]))
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
                <div className="invalid-message"> {isDateTakenMessage}</div>
            </div>
        </div>
    )
}
export default AppointmentAddForm