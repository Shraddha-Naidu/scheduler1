export function getAppointmentsForDay(state, day) {
  let appointments = [];

  const filteredApp = state.days.filter(d => d.name === day);

  if (filteredApp.length){
    appointments = filteredApp[0].appointments.map(x => state.appointments[x]);
  }

  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  let interviewObj= {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;
}