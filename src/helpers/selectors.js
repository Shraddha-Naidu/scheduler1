export function getAppointmentsForDay(state, day) {
  const appointments = [];

  for (const dia of state.dias) {
    if (dia.name === day) {
      appointments.push(...day.appointments)
    }
  }

  const existing = appointments.map(app => {
      return state.appointments[app]
    })

  return existing;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  const interviewerID = interview.interviewer

  let interviewObj= {
    student: interview.student,
    interviewer: state.interviewers[interviewerID]
  };

  return interviewObj;
}