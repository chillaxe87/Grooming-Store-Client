import React from 'react'

const AppointmentsTime = (props) => {

    const time = props.time;
    const day = time[8] + time[9]
    const month = time[5] + time[6]
    const hour = time[11] + time[12]
    const minutes = time[14] + time[15]


    const monthToDispalay = () => {
        switch(month){
            case "01":
                return " Jun "
            case "02":
                return " Feb "
            case "03":
                return " Mar "
            case "04":
                return " Apr "
            case "05":
                return " May "
            case "06":
                return " Jun "
            case "07":
                return " Jul "
            case "08":
                return " Aug "
            case "09":
                return " Sep "               
            case "10":
                return " Oct "
            case "11":
                return " Nov "
            default:
                return " Dec "
        }
    }

    const dateToDisplay =  day + monthToDispalay() + " at " + hour + ":" + minutes

    return (
        <span>{dateToDisplay}</span>
    )
}

export default AppointmentsTime