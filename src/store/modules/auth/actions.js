export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },
  async auth(context, payload) {
    const mode = payload.mode
    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsSxptF79dnDk0b0NLRCrm3wMivLAQ6uk`
    if (mode == 'signup') {
      // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
      AIzaSyBsSxptF79dnDk0b0NLRCrm3wMivLAQ6uk`
    }
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    /**
     * Also store response data to brower's localStorage.
     * If we store data only in Vuex, when the browser is refreshed,
     * Vue app is restarted and we lose the auth state
     */
    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)

    context.commit('setUser', {
      token: responseData.idToken, // A Firebase Auth ID token for the authenticated user
      userId: responseData.localId, // The uid of the authenticated user
      tokenExpiration: responseData.expiresIn
    });
  },
  // Dispatch tryLogin whenever Vue app restarts
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
  },
  /**
   * No need to send request to backend
   * because it does not hold any info about fed.
   * It does not care what is happening to fed.
   * This is how authentication works for SPA.
   */
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  }
};
