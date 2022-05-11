import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplcationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Sets state for day
  const setDay = day => setState({ ...state, day });

  //axios request
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


 //Book new Interview
 function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, appointment)
  .then((res) => {
    const days = spotUpdate(state.day, state.days, appointments);
    setState(prev => ({...prev, appointments, days}));
    })
  }

  //Cancel Appointment
function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      const days = spotUpdate(state.day, state.days, appointments);
      setState({...state, appointments, days})
    })
  }

  //Updates available spots
  function spotUpdate(day, days, appointments) {
    const dayObj = days.find(d => d.name === day);
    const apptID = dayObj.appointments;

    let spots = 0;

    for (const id of apptID) {
      const appt = appointments[id];
      if (!appt.interview) {
        spots++;
      }
    }
    const newDayObj = {...dayObj, spots};
    const newArr = days.map((item) => (item.name === day ? newDayObj : item));
    return newArr;
  }
  return { state, useEffect, cancelInterview, bookInterview, setDay };




}