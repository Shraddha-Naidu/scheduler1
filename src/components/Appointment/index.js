import React from "react"

import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";


import "components/Appointment/styles.scss"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back} = useVisualMode(
    props.interview? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(response => {
      transition(SHOW);
    })
  };

  const cancel = (id) => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })


  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => cancel(props.id)}/>}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
        {mode === SAVING && <Status message={SAVING}/>}
        {mode === DELETING && <Status message={DELETING}/>}
    </article>
  )
}