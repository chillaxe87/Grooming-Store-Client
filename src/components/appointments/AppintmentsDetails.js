import React, { useContext, useState } from 'react';

import AppointmentsTime from './AppointmentsTime'
import AppointmentsTimeSelect from './AppointmentsTimeSelect';
import { deleteAppointmentFromDb } from '../../server/appointments'
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import AppointmentAddForm from './AppointmentAddForm';


const AppointmentDetails = (props) => {

    const { userData } = useContext(LoginContext);
    const [isEditMode, setIsEditMode] = useState(false)
    const history = useHistory()

    const onClickAbortAppointments = async (event) => {
        event.preventDefault()
        await deleteAppointmentFromDb(props.appointment.id, userData.token).then((res) => {
            console.log(res)
        }, (err) => {
            console.log(err)
        });
        history.push("/")
        props.setAppointmentDetails(null)
    }

    const onClickEditAppointments = () => {
        setIsEditMode(true)
    }
    return (
        <div className="appointments__details">
            <div className="appointments__details-body">
                <button className="close__button" onClick={() => props.setAppointmentDetails(null)}>x</button>
                <h3>Appointment Details</h3>
                <h4>{props.appointment.userName}</h4>
                <div> <b>Scheduled For: </b> <AppointmentsTime time={props.appointment.scheduledFor} /></div>
                <div> <b>Scheduled At : </b> <AppointmentsTime time={props.appointment.scheduledAt} /></div>
                {isEditMode &&
                    <form>
                        <input type="date" />
                        <AppointmentsTimeSelect />
                    </form>}
                <div className="buttons">
                    <button onClick={onClickEditAppointments}>Edit</button>

                    <button onClick={onClickAbortAppointments}>Delete</button>
                </div>
                {isEditMode && <AppointmentAddForm idZero={props.appointment.id} />}
            </div>
        </div>
    );
}

export default AppointmentDetails