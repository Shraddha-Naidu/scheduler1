//Uses state to return appointments for specific day
export function getAppointmentsForDay(state, day) {
  
  const filteredApp = state.days.filter(d => d.name === day);

  let appointments = [];

  if (filteredApp.length){
    appointments = filteredApp[0].appointments.map(x => state.appointments[x]);
  }

  return appointments;
}

//Add interviewer info to an interview
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

//Return interviewers for specific day
export function getInterviewersForDay(state, day) {
  let dayInterviewers = [];//Returns array of interviewers

  const dayApp = state.days.filter(d => d.name === day);//Returns data filtered by day


  for (const i of dayApp[0].interviewers) {
    dayInterviewers.push(state.interviewers[i]);
  }
  return dayInterviewers;
}