// import { nanoid } from "nanoid";
// import React, { useEffect, useReducer, useState } from 'react';
// import Appointment from "../components/appointments/Appointment";

let index = 0;

// export const users = [
//     {
//         UserName: "Dan",
//         Id: nanoid(),
//     },
//     {
//         UserName: "Koby",
//         Id: nanoid(),
//     },
//     {
//         UserName: "Haim",
//         Id: nanoid(),
//     }
// ];

// export const initialAppointmentsState = [
//     {
//         scheduledFor: new Date(2021, 10, 2, 10, 30),
//         userName: users[0].UserName,
//         userId: users[0].Id,
//         id: 99,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 3, 10, 30),
//         userName: users[1].UserName,
//         userId: users[1].Id,
//         id: 98,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 4, 12, 0),
//         userName: users[2].UserName,
//         userId:users[2].Id,
//         id: 97,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 3, 16, 40),
//         userName: users[2].UserName,
//         userId: users[2].Id,
//         id: 96,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 4, 10, 45),
//         userName: users[1].UserName,
//         userId: users[1].Id,
//         id: 95,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 3, 9, 45),
//         userName: users[1].UserName,
//         userId: users[1].Id,
//         id: 91,
//     },
//     {
//         scheduledFor: new Date(2021, 10, 4, 13, 0),
//         userName: users[0].UserName,
//         userId: users[0].Id,
//         id: 100,
//     },
// ]

const appointmentsReducer = (appointments, action) => {
    index = -1
    switch(action.type){
        case "ADD_APPOINTMENT": 
            return [...appointments, action.appointments]
        case "INIT_APPOINTMENT": {
            if(!!action.appointments){
                return [...action.appointments]
            }
            return [...appointments]
        }
        case "EDIT_APPOINTMENT":
            console.log("Edit")
            console.log(action.appointment)
            index = appointments.findIndex(e => e.id === action.appointment.id)
            appointments[index] = action.appointment
            console.log(action.appointment)
            return [...appointments];   

        case "ABORT_APPOINTMENT":
            let newAppointments = [...appointments]
            index = newAppointments.findIndex(a => a.id === action.id)
            return [...appointments.splice(index, 1)]
        default:
            return [...appointments];      
    }
}

export default appointmentsReducer