export default {
  namespaced: true,
  state() {
    return {
      authToken: null,
      userId: null,
    };
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.token;
    },
  },
  actions: {
    async login(context, payload) {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        });

        const responseData = await response.json();
        const token = responseData.accessToken;

        localStorage.setItem('token', token);
        context.commit('setToken', { token });
      } catch (error) {
        alert('Не удалось войти');
      }
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');

      if (token) {
        context.commit('setToken', { token });

        return true;
      }

      return false;
    },
    logout(context) {
      localStorage.removeItem('token');
      context.commit('setToken', { token: null });
    },
  },
};
