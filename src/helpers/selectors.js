//Uses state to return appointments for specific day
export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(d => d.name === day);

  let appointments = [];

  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointments[x]);
  }

  return appointments;
}

//Return interviewers for specific day
export function getInterviewersForDay(state, day) {
  const allInterviewers = [];
  state.days.forEach((dayOf) => {
    if (dayOf.name === day){
      dayOf.interviewers.forEach((event) => {
        allInterviewers.push(state.interviewers[event]);
      });
    }
  });
  return allInterviewers;
}

//Add interviewer info to an interview
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewObject = {};
  interviewObject.student = interview.student;
  interviewObject.interviewer = state.interviewers[interview.interviewer];

  return interviewObject;
}