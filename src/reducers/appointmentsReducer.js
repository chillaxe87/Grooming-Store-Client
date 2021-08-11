import { nanoid } from "nanoid";
import React, { useEffect, useReducer, useState } from 'react';

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
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 3, 10, 30),
        owner: users[1],
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 4, 12, 0),
        owner: users[2],
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 3, 16, 40),
        owner: users[2],
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 4, 10, 45),
        owner: users[1],
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 3, 9, 45),
        owner: users[1],
        id: nanoid(),
    },
    {
        time: new Date(2021, 10, 4, 13, 0),
        owner: users[0],
        id: nanoid(),
    },
]

const appointmentsReducer = (appointments, action) => {
    switch(action.type){
        case "ADD_APPOINTMENT": 
            return appointments.concat(action.appointment);
        case "SORT_APPOINTMENT":
            return action.appointments
        case "Edit_APPOINTMENT":
            return null;
        default:
            return [...appointments];      
    }
}

export default appointmentsReducer