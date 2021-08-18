import { nanoid } from "nanoid";
// import React, { useEffect, useReducer, useState } from 'react';
// import Appointment from "../components/appointments/Appointment";

var index = 0;

export const users = [
    {
        name: "Dan",
        id: nanoid(),
    },
    {
        name: "Koby",
        id: nanoid(),
    },
    {
        name: "Haim",
        id: nanoid(),
    }
];

export const initialAppointmentsState = [
    {
        time: new Date(2021, 10, 2, 10, 30),
        owner: users[0],
        id: 99,
    },
    {
        time: new Date(2021, 10, 3, 10, 30),
        owner: users[1],
        id: 98,
    },
    {
        time: new Date(2021, 10, 4, 12, 0),
        owner: users[2],
        id: 97,
    },
    {
        time: new Date(2021, 10, 3, 16, 40),
        owner: users[2],
        id: 96,
    },
    {
        time: new Date(2021, 10, 4, 10, 45),
        owner: users[1],
        id: 95,
    },
    {
        time: new Date(2021, 10, 3, 9, 45),
        owner: users[1],
        id: 91,
    },
    {
        time: new Date(2021, 10, 4, 13, 0),
        owner: users[0],
        id: 100,
    },
]

const appointmentsReducer = (appointments, action) => {
    switch(action.type){
        case "ADD_APPOINTMENT": 
            return [...appointments, action.appointment]
        case "INIT_APPOINTMENT": {
            console.log("Reducer:")
            console.log([...action.appointments])
            return [...action.appointments]
        }
        case "EDIT_APPOINTMENT":
            console.log("Edit")
            console.log(action.appointment)
            index = appointments.findIndex(e => e.id === action.appointment.id)
            appointments[index] = action.appointment
            return [...appointments];   

        case "ABORT_APPOINTMENT":
            let newAppointments = [...appointments]
            newAppointments.filter(a => a.id === action.id)
            return [...appointments.splice(index, 1)]
        default:
            return [...appointments];      
    }
}

export default appointmentsReducer