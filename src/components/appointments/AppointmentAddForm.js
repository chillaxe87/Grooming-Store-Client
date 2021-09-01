import React, { useState, useContext } from 'react'
import AppointmentsTimeSelect from './AppointmentsTimeSelect';
import { getAppointmentsFromDb, postAppointmentInDb, putAppointmentInDb } from '../../server/appointments';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

const AppointmentAddForm = (props) => {

    const { userData } = useContext(LoginContext);
    const history = useHistory();
    const [date, setDate] = useState(["", "", ""]);
    const [isDateAvailable, setIsDateAvailable] = useState(false)
    const [time, setTime] = useState(["", ""]);
    const [isFormValid, setIsFormValid] = useState(false);
    const allOptions = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
    const [options, setOptions] = useState(allOptions)
    const [isNewDay, setIsNewDay] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const onClickAddNewSchedule = (event) => {
        event.preventDefault();
        setIsFormValid(true);
        const csTime = new Date(date[0], date[1], date[2], time[0], time[1])
        let currentTime = new Date()

        if (props.idZero === "0") {
            let appointment = {
                id: 0,
                userName: userData.userName,
                userId: userData.id,
                scheduledFor: csTime,
                scheduledAt: currentTime,
            }
            postAppointmentInDb(JSON.stringify(appointment), userData.token).then((data) => {
                history.push('/')
                props.onClickNewForm();
            }, (err) => {
                setErrorMessage("Failed to submit, try again.")
                console.log(err)
            })
        } else {
            let appointment = {
                id: props.idZero,
                userName: userData.userName,
                userId: userData.id,
                scheduledFor: csTime,
                scheduledAt: currentTime,
            }
            putAppointmentInDb(JSON.stringify(appointment), userData.token).then((data) => {
                console.log(data)
                history.push('/')
            }, (err) => {
                setErrorMessage("Update Failed, try again.")
                console.log(err)
            })
        }
    }

    const onChangeDate = async (event) => {
        const newDate = event.target.value.split('-');
        let current = new Date()
        let isDateValid = true;
        isDateValid = current.getFullYear() <= parseInt(newDate[0]) ? true : false;
        isDateValid = current.getMonth() <= newDate[1] - 1 && isDateValid ? true : false

        if (current.getMonth() === newDate[1] - 1 && isDateValid) {
            isDateValid = current.getDate() <= parseInt(newDate[2]) ? true : false
        }

        if (isDateValid) {
            setDate([newDate[0], newDate[1] - 1, newDate[2]])
            getDates(newDate[0], newDate[1], newDate[2])
            setIsDateAvailable(true)
        } else {
            setDate(...["", "", ""])
            setIsDateAvailable(false)
            setIsFormValid(false)
        }
        setTime(["", ""])
    }
    const getDates = async (year, month, day) => {
        let appointments = []
        const querryDate = year + "." + month + "." + day
        await getAppointmentsFromDb('?date=' + querryDate).then((appointmentsData) => {
            appointments = appointmentsData;
        }, (err) => {
            console.log(err)
        })

        console.log("appointments found on: ", querryDate)
        console.log(appointments)

        if (!!appointments) {
            let availableOptions = allOptions
            appointments.forEach(appointment => {
                const time = appointment.scheduledFor[11] + appointment.scheduledFor[12] + ":" + appointment.scheduledFor[14] + appointment.scheduledFor[15];
                const index = availableOptions.indexOf(time)
                availableOptions.splice(index, 1)
            });

            console.log("getting options")
            console.log(availableOptions)
            setOptions(availableOptions)
            let clone = !isNewDay
            setIsNewDay({ ...clone })
            return options
        }
    }

    const onChangeTime = (event) => {
        const newTime = event.target.value.split(':');
        setTime([newTime[0], newTime[1]])
        setIsFormValid(true)

    }


    return (
        <div className="appointments__add">
            <div className="appointments__add-body">
                <h3>{props.idZero === "0" ? "Schedule New Appointment" : "Edit Time"}</h3>
                <form onSubmit={onClickAddNewSchedule}>
                    <button className="close__button" onClick={props.onClickNewForm}>x</button>
                    <label>Date: </label>
                    <input type="date" onChange={onChangeDate} />
                    {isDateAvailable && <label htmlFor="hour">Time: </label>}
                    {
                        isDateAvailable && <AppointmentsTimeSelect onChangeTime={onChangeTime} date={date} options={options} />
                    }
                    <button type="submit" className="form__button" disabled={!isFormValid}>{props.idZero === "0" ? "Schedule" : "Edit"}</button>
                </form>
                {errorMessage !== "" && <div className="invalid-message">{errorMessage}</div>}
            </div>
        </div>
    )
}
export default AppointmentAddForm