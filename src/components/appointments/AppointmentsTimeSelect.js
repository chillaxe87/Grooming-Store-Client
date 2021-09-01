import React from 'react'



const AppointmentsTimeSelect = (props) => {

    const options = props.options || []

    return (
        <select name="hour" id="hour" onChange={props.onChangeTime}>
            <option value="0">Time</option>
            {options.length !== 0 && options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}

        </select>
    )
}

export default AppointmentsTimeSelect