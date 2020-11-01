<template>
  <form @submit.prevent="login">
    <div class="input">
      <label for="email">Введите email:</label>
      <input id="email" type="email" name="email" value="test0@test.test" required>
    </div>
    <div class="input">
      <label for="password">Введите пароль:</label>
      <input id="password" type="password" name="password" value="test0" required>
    </div>
    <div class="button-group">
      <button type="submit">Войти</button>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    login(event) {
      const email = event.target.email.value;
      const password = event.target.password.value;

      this.$store.dispatch('auth/login', {email, password})
    }
  }
}
</script>

<style scoped>
  form {
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 10px 15px;

    border: .1rem solid #1c6835;
    border-radius: 3px;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }

  label {
    margin-bottom: 3px;
  }

  .button-group {
    margin: 10px 0;
    display: flex;
    justify-content: center;
  }
</style>