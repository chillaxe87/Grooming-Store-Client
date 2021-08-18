import React, { useState } from 'react'
import { addAppointment } from '../../actions/appointmentsAction';
import { nanoid } from "nanoid";
import AppointmentsTimeSelect from './AppointmentsTimeSelect';

const AppointmentAddForm = (prop) => {

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [minutes, setMinutes] = useState("");
    const [isformValid, setIsFormValid] = useState(true)

    const [dateAndTime, setDateAndTime] = useState(null)

    const onClickAddNewSchedule = (event) => {
        event.preventDefault();
        prop.setAppointments(addAppointment({
            time: dateAndTime,
            owner: {name: "Test", id: nanoid()},
            id: nanoid()
        }))
        prop.onClickNewForm();
    }

    const onChangeDate = (event) => {
        event.preventDefault();
        const newDate = event.target.value.split('-');

        setYear(newDate[0]);
        setMonth(newDate[1]);
        setDay(newDate[2]);

        let date = new Date(newDate[0], newDate[1] -1, newDate[2], hour, minutes)
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
                <h3>Schedule New Appointment</h3>
                <form onSubmit={onClickAddNewSchedule}>
                    <button className="close__button" onClick={prop.onClickNewForm}>x</button>
                    <label>Date: </label>
                    <input type="date" onChange={onChangeDate} />
                    <label htmlFor="hour">Time: </label>
                    <AppointmentsTimeSelect onChangeTime={onChangeTime} />
                    <button type="submit" className="form__button" disabled={isformValid}>Schedule</button>
                </form>
            </div>
        </div>
    )
}
export default AppointmentAddForm