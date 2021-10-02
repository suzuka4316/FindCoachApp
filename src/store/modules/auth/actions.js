export default {
  login() {

  },
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  async signup(context, payload) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    AIzaSyBsSxptF79dnDk0b0NLRCrm3wMivLAQ6uk`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      })
    })
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.')
      throw error
    }
    console.log(responseData)
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    })
  }
}