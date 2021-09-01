import React from 'react';

const AppointmentsMenu = ({ onClickSortByName, onClickSortByDate, isUserSortDown, isDateSortDown, onClickNewForm }) => {

    return (
        <div className="appointment-func">
            <div onClick={onClickSortByName}>Name <i className={isUserSortDown ? "arrow up" : "arrow down"}></i></div>
            <div onClick={onClickSortByDate}>Date <i className={isDateSortDown ? "arrow up" : "arrow down"}></i></div>
            <div className="add-appointment" onClick={onClickNewForm}>Add</div>
        </div>
    )
}

export default AppointmentsMenu