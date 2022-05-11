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
  const CONFIRM = "CONFIRM";
  const EDIT = "EDITING";
  const ERROR_SAVE = "ERROR_SAVING"
  const ERROR_DELETE = "ERROR_DELETING"

  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
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
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
  };

  const cancel = (id) => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
        <Show
        student={props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.name}
        onEdit={() => {transition(EDIT)}}
        onDelete={() =>{ transition(CONFIRM)}}
        />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
        {mode === SAVING && <Status message={SAVING}/>}
        {mode === DELETING && <Status message={DELETING}/>}
        {mode === CONFIRM && <Confirm message= 'Delete appointment?' onCancel={() => back()} onConfirm={cancel} />}
        {mode === EDIT && (
        <Form
        student={props.interview && props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview && props.interview.interviewer && props.interview.interviewer.id}
        onSave={save}
        onCancel={() =>{
          transition(SHOW);
        }}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="ERROR: Changes have not been saved."
        onClose={() => {
          transition(props.id ? EDIT : CREATE)
        }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="ERROR: Appointment has not been deleted."
        onClose={() => {
          transition(SHOW);
        }}
        />
      )}
    </article>
  )
}