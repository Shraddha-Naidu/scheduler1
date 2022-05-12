export function getAppointmentsForDay(state, day) {
  const appArr = [];
  state.days.forEach((dayOf) => {
    if (dayOf.name === day){
      dayOf.appointments.forEach((event) => {
        appArr.push(state.appointments[event]);
      });
    }
  });
  return appArr;
}

export function getInterviewersForDay(state, day) {
  const intArr = [];
  state.days.forEach((dayOf) => {
    if (dayOf.name === day){
      dayOf.interviewers.forEach((event) => {
        console.log(state)
        console.log(event)
        intArr.push(state.interviewers[event]);
      });
    }
  });
  return intArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let interviewObj = {};
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];

  return interviewObj;
}