import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

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

  //Checks for input name and that interviewer is selected
  const validation = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("")
    props.onSave(name, interviewer, props.status);
  };



  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList
      interviewers={ props.interviewers }
      value={interviewer}
      onChange={setInterviewer}
    />
    </section>
    <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validation} confirm>Save</Button>
    </section>
    </section>
    </main>
  )
}