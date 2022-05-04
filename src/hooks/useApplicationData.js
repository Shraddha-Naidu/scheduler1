import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const setDay = day => setState({ ...state, day });

const dailyAppointments = getAppointmentsForDay(state, state.day)
const dailyInterviewers = getInterviewersForDay(state, state.day);

async function bookInterview(id, interview) {
  console.log(id, interview);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const res = await axios.put(`/api/appointments/${id}`, { interview });
  setState({
    ...state,
    appointments
  });
  return res;
};

function cancelInterview(id) {
  return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state})
    })
}



useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
  ])
  .then((response) => {
      console.log(response)
      setState(prev => ({
         ...prev,
         days: response[0].data,
         appointments: response[1].data,
         interviwers: response[2].data
         }));
    });
}, [])
}