export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    // TODO: this logic search for the coach one by one. Alternatively could have userIsCoach state that returns true or false
    return coaches.some(coach => coach.id === userId)
  }
}