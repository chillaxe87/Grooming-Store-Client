import React, { useContext, useEffect, useState } from 'react';
import Appointment from './Appointment';
import AppointmentDetails from './AppintmentsDetails';
import AppointmentAddForm from './AppointmentAddForm';
import { AppointmentsContext } from '../../context/AppointmentsContext';
import { useHistory, useLocation } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import { getAppointmentsFromDb } from '../../server/appointments';
import AppointmentsMenu from './AppointmentsMenu';
import Loader from '../main/Loader';


const Appointments = (props) => {

    const history = useHistory();
    const location = useLocation();

    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isDateSortDown, setIsDateSortDown] = useState(true);
    const [isUserSortDown, setIsUserSortDown] = useState(false);
    const [isNewForm, setIsNewForm] = useState(false);

    const { appointmentsState } = useContext(AppointmentsContext)
    const [appointments, setAppointments] = useState(appointmentsState);
    const [page, setPage] = useState(1);
    const [isDataLoaded, seIsDataLoaded] = useState(false)
    const [nextAvailable, setNextAvailable] = useState(false)

    const { userData } = useContext(LoginContext);

    const size = 8
    const sizeQuery = "&size=" + size

    useEffect(() => {
        let query = location.search + sizeQuery
        if (location.search === "") {
            query = '?page=1' + sizeQuery
        }
        getAppointmentsFromDb(query).then((data) => {
            if (!!data) {
                updateDisplayList(data)
            } else {
                setNextAvailable(false)
            }
            seIsDataLoaded(true)
        }, (err) => {
            console.log(err)
        })

        return (() => setAppointments([]))

    }, [sizeQuery, page, nextAvailable, location.search]);


    const updateDisplayList = (data) => {
        let displayList = [...data]
        if (displayList.length - 1 === size) {
            displayList.pop()
        }

        setAppointments(displayList)
        if (data.length > displayList.length) {
            setNextAvailable(true)
        } else {
            setNextAvailable(false)
        }

    }
    const onClickSortByDate = () => {
        isDateSortDown ?
            setAppointments(appointments.sort(function (a, b) { return a.scheduledFor.localeCompare(b.scheduledFor) })) :
            setAppointments(appointments.sort(function (a, b) { return b.scheduledFor.localeCompare(a.scheduledFor) }))

        setIsDateSortDown(!isDateSortDown)
    }
    const onClickSortByName = () => {
        isUserSortDown ?
            setAppointments(appointments.sort(function (a, b) { return a.userName.localeCompare(b.userName) })) :
            setAppointments(appointments.sort(function (a, b) { return b.userName.localeCompare(a.userName) }));

        setIsUserSortDown(!isUserSortDown)
    }
    const onClickNewForm = () => {
        if (!!userData.user) {
            setIsNewForm(!isNewForm);
        } else {
            history.push('/login')
        }
    }

    const onClickNextPage = () => {
        let newPage = page + 1;
        setPage(newPage)
        const newUrl = '/Appointments?page=' + newPage
        history.push(newUrl)
    }
    const onClickBackPage = () => {
        let newPage = page <= 1 ? page : page - 1;
        setPage(newPage)
        const newUrl = '/Appointments?page=' + newPage
        history.push(newUrl)
    }
    return (
        <div className="appointment-container">
            {!isDataLoaded && <Loader />}
            <div className="appointment">
                <div className="appointment-title">Appointments Schedule</div>
                <AppointmentsMenu
                    onClickSortByName={onClickSortByName}
                    onClickSortByDate={onClickSortByDate}
                    isUserSortDown={isUserSortDown}
                    isDateSortDown={isDateSortDown}
                    onClickNewForm={onClickNewForm}
                />
                {appointments.length !== 0 && appointments.map((appointment) => (
                    <Appointment
                        key={appointment.id}
                        appointment={appointment}
                        setAppointmentDetails={setAppointmentDetails}
                    />
                ))}
                {
                    !!appointmentDetails && <AppointmentDetails
                        appointment={appointmentDetails}
                        setAppointmentDetails={setAppointmentDetails}
                    />
                }
                {
                    isNewForm && <AppointmentAddForm
                        onClickNewForm={onClickNewForm}
                        setAppointments={setAppointments}
                        idZero="0"
                    />
                }
                <div className="nav__button">
                    <button disabled={location.search === "?page=1"} onClick={onClickBackPage}>back</button> <button onClick={onClickNextPage} disabled={!nextAvailable}>next</button>
                </div>
            </div>
        </div>
    );
}

export default Appointments