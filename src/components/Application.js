import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.jsx";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const allAppointments = dailyAppointments.map( appointment => {
    const interview = getInterview(state, appointment.interview)
  
    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments")
    ])
    .then((response) => {
        console.log(response)
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data }));
      });
  }, [])

  return (
    <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
    </section>
    <section className="schedule">
      {allAppointments}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

