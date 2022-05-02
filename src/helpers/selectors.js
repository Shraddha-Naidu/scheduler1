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

  let interviewObject= {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  let interviewers = [];

  const filteredApp = state.days.filter(d => d.name === day);

  if (filteredApp.length){
    interviewers = filteredApp[0].interviewers.map(x => state.interviewers[x]);
  }
  return interviewers;
}