<template>
  <button @click="logout">Выйти</button>

  <add-contact @add-contact="addContact" />
  <contacts-filter @change-filter="changeFilter" />

  <h2>Список контактов</h2>
  <ul>
    <li v-for="contact in filteredContacts.slice().reverse()" :key="contact.id">
      <form class="edit-contact" @submit.prevent="editContact(contact.id)">
        <div>Имя: <span v-if="!editing(contact.id)">{{ contact.name }}</span><input type="text" name="name" placeholder="Введите имя" required v-if="editing(contact.id)" v-model="contact.name"></div>
        <div>Телефон: <span v-if="!editing(contact.id)">{{ contact.phone }}</span><input type="text" name="phone" placeholder="Введите телефон" required v-if="editing(contact.id)" v-model="contact.phone"></div>
        <div>E-mail: <span v-if="!editing(contact.id)">{{ contact.email }}</span><input type="email" name="email"  placeholder="Введите email" required v-if="editing(contact.id)" v-model="contact.email"></div>
        <div class="button-group">
          <button class="yellow" @click.prevent="prepareEdit(contact.id)" v-if="!editing(contact.id)">Редактировать</button>
          <button class="yellow" @click.prevent="cancelEdit(contact.id)" v-if="editing(contact.id)">Отменить</button>
          <button type="submit" v-if="editing(contact.id)">Сохранить</button>
          <button class="red" @click.prevent="deleteContact(contact.id)">Удалить</button>
        </div>
      </form>
    </li>
  </ul>
</template>

<script>
import AddContact from '../components/AddContact.vue';
import ContactsFilter from '../components/ContactsFilter.vue';

export default {
  components: {
    AddContact,
    ContactsFilter
  },
  data() {
    return {
      contacts: [],
      filteredContacts: [],
      beingEdited: [],
    }
  },
  async created() {
    this.contacts = await this.$store.dispatch('contacts/loadContacts');
    this.filteredContacts = this.contacts;
  },
  methods: {
    editing(id) {
      return this.beingEdited.indexOf(id) >= 0;
    },
    prepareEdit(id) {
      this.beingEdited.push(id);
    },
    cancelEdit(id) {
      this.beingEdited.splice(this.beingEdited.indexOf(id), 1);
    },
    deleteContact(id) {
      this.filteredContacts = this.filteredContacts.filter(contact => contact.id !== id);
      this.contacts = this.contacts.filter(contact => contact.id !== id);
      this.$store.dispatch('contacts/deleteContact', { id });
    },
    editContact(id) {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;

      this.cancelEdit(id);
      this.$store.dispatch('contacts/editContact', { id, name, email, phone })
    },
    addContact(newContact) {
      this.filteredContacts.push(newContact);
    },
    changeFilter(filterOptions) {
      this.filteredContacts = this.contacts.filter(contact => {
        return contact.name.indexOf(filterOptions.name) >= 0
          && contact.email.indexOf(filterOptions.email) >= 0
          && contact.phone.indexOf(filterOptions.phone) >= 0;
      })
    },
    logout() {
      this.$store.dispatch('auth/logout');
    },
  }
}
</script>

<style scoped>
ul {
  margin: 10px 0;
  padding: 0;
}

li {
  list-style: none;
  margin: 5px 0;
  padding: 5px;

  border: .1rem solid  #1c6835;
  border-radius: 3px; 
}

form.edit-contact {
  display: flex;
  flex-direction: column;
}

form.edit-contact div {
  margin-bottom: 3px;
}

form.edit-contact .button-group button:not(:first-child) {
  margin-left: 5px;
}
</style>