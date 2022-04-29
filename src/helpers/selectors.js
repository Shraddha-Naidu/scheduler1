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