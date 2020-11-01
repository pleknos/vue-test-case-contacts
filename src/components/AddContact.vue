<template>
  <section class="add-contact">
    <h2>Добавление контактов</h2>
    <form @submit.prevent="addContact">
      <div class="input">
        <label for="name">Имя:</label>
        <input id="name" type="text" name="name" placeholder="Введите имя" required>
      </div>
      <div class="input">
        <label for="phone">Телефон:</label>
        <input id="phone" type="text" name="phone" placeholder="Введите телефон" required>
      </div>
      <div class="input">
        <label for="email">E-mail:</label>
        <input id="email" type="email" name="email"  placeholder="Введите email" required>
      </div>
      <div class="button-group">
        <button type="submit">Добавить контакт</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  emits: ['add-contact'],
  methods: {
    async addContact() {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;

      const newContact = await this.$store.dispatch('contacts/addContact', { name, email, phone });

      this.$emit('add-contact', newContact);
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 5px;

  border: .1rem solid #1c6835;
  border-radius: 3px;
}

form .input {
  display: grid;
  grid-template-columns: 100px 1fr;
  margin: 5px 0;
}

form .input label {
  margin-bottom: 3px;
}

form .button-group {
  margin: 5px 0;
  display: flex;
}
</style>