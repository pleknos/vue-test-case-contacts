<template>
  <Contacts v-if="isAuth"/>
  <Login v-else />
</template>

<script>
import Contacts from './pages/Contacts.vue';
import Login from './pages/Login.vue';

export default {
  components: {
    Login, Contacts
  },
  data() {
    return {
      isAuth: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'auth/setToken') {
        if (state.auth.token) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    });

    const isLoggedIn = this.$store.dispatch('auth/tryLogin');
  },
  beforeUnmount() {
    this.unsubscribe();
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");

* {
  box-sizing: border-box;
  font-size: 16px;
}

html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}

.container {
  padding: 15px;
  max-width: 1100px;
  margin: 0 auto;
}

.hide {
  display: none;
}

input[type="text"], input[type="email"], input[type="password"] {
  padding: 5px 10px;

  border: .1rem solid  #1c6835;
  border-radius: 3px;
}

button {
  padding: 5px 25px;

  border: .1rem solid #1c6835;
  border-radius: 3px;
  background-color: transparent;

  cursor: pointer;
}

button:hover {
  background-color: #6dd690;
}

button.red {
  border-color: #a81e1e
}

button.red:hover {
  background-color: rgb(245, 146, 146);
}

button.yellow {
  border-color: #cde021
}

button.yellow:hover {
  background-color: rgb(246, 250, 189);
}
</style>