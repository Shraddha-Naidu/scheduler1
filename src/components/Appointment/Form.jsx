import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //Reset form function
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  //Cancel function, calls reset on cancel
  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={event => setName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <InterviewerList 
      interviewers={ props.interviewers } value={interviewer} onChange={setInterviewer}
    />
    </section>
    <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={props.onSave} confirm>Save</Button>
    </section>
    </section>
    </main>
  )
}