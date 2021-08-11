import React, { useState } from 'react'

const AppointmentAddForm = (prop) => {

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [time, setTime] = useState("");
    const [isValidDay, setIsValidDay] = useState(false)
    const [isValidMonth, setIsValidMonth] = useState(false)
    const [isValidTime, setIsValidTime] = useState(false)

    const onClickAddNewSchedule = (event) => {
        event.preventDefault();

        console.log("day : " + day + " month: " + month + " " + time)
        prop.onClickNewForm();
    }

    const onChangeDay = (event) => {
        event.preventDefault();
        const theDay = event.target.value;
        if(theDay != "0"){
            setIsValidDay(true)
            setDay(theDay)
        } else {
            setIsValidDay(false)
        }
    }
    const onChangeMonth = (event) => {
        event.preventDefault();
        const theMonth = event.target.value;
        if(theMonth != "0"){
            setIsValidMonth(true)
            setMonth(theMonth)
        } else {
            setIsValidMonth(false)
        }
    }
    const onChangeTime = (event) => {
        event.preventDefault();
        const theTime = event.target.value;
        if(theTime != "0"){
            setIsValidTime(true)
            setTime(theTime)
        } else{
            setIsValidTime(false)
        }
    }

    const isFormValid = () => {
        return !isValidDay || !isValidMonth || !isValidTime
    }

    return (
        <div className="appointments__add">
            <div className="appointments__add-body">
                <h3>Schedule New Appointment</h3>
                <form onSubmit={onClickAddNewSchedule}>
                    <button className="close__button" onClick={prop.onClickNewForm}>x</button>
                    <label for="day">Day: </label>
                    <select name="day" id="day" onChange={onChangeDay}>
                        <option value="0">Day</option> 
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">23</option>
                        <option value="23">24</option>
                        <option value="24">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <label for="month">Month: </label>
                    <select name="month" id="month" onChange={onChangeMonth}>
                        <option value="0">Month</option> 
                        <option value="1">Junuary</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">Octorber</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                    <label for="hout">Time: </label>
                    <select name="hour" id="hour" onChange={onChangeTime}>
                        <option value="0">Time</option>
                        <option value="9:00">09:00</option>
                        <option value="9:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                    </select>
                    <button type="submit" className="form__button" disabled={isFormValid()}>Schedule</button>
                </form>

            </div>
        </div>
    )
}
export default AppointmentAddForm