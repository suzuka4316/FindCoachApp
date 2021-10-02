export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const response = await fetch(`https://vue-http-demo-bc6fe-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT', //update if user already exists in backend
      body: JSON.stringify(coachData)
    })

    // const responseData = await response.json()

    if (!response.ok) {
      // error...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  }
}