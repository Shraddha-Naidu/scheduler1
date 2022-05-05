//Uses state to return appointments for specific day
export function getAppointmentsForDay(state, day) {
  const appointmentsAvail = [];
  state.days.forEach((dayOf) => {
    if (dayOf.name === day){
      dayOf.appointments.forEach((event) => {
        appointmentsAvail.push(state.appointments[event]);
      });
    }
  });
  return appointmentsAvail;
}

//Return interviewers for specific day
export function getInterviewersForDay(state, day) {
  const dayInterviewers = [];
  state.days.forEach((dayOf) => {
    if (dayOf.name === day){
      dayOf.interviwers.forEach((event) => {
        dayInterviewers.push(state.interviwers[event]);
      })
    }
  })
  return dayInterviewers;
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
};