import React, {useState} from 'react'

const AppointmentsTime = (props) => {

    const time = props.time;

    const day = time.getDate();
    const month = time.getMonth();
    const hour = time.getHours();
    const minutes = time.getMinutes();

    const monthToDispalay = () => {
        switch(month){
            case 0:
                return "Jun "
            case 1:
                return "Feb "
            case 2:
                return "Mar "
            case 3:
                return "Apr "
            case 4:
                return "May "
            case 5:
                return "Jun "
            case 6:
                return "Jul "
            case 7:
                return "Aug "
            case 8:
                return "Sep "               
            case 9:
                return "Oct "
            case 10:
                return "Nov "
            default:
                return "Dec "
        }
        return null;
    }

    const dateToDisplay = monthToDispalay() + day + " at " + hour + ":" + minutes

    return (
        <span>{dateToDisplay}</span>
    )
}

export default AppointmentsTime