export default {
  namespaced: true,
  actions: {
    async loadContacts(context, payload) {
      const response = await fetch('http://localhost:8080/contacts');
      const responseData = await response.json();

      return responseData;
    },
    async addContact(context, payload) {
      try {
        const response = await fetch('http://localhost:8080/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            phone: payload.phone,
          }),
        });

        const responseData = await response.json();

        return { name: payload.name, email: payload.email, phone: payload.phone, id: responseData.id };
      } catch (error) {
        alert('Не удалось добавить контакт');
      }
    },
    deleteContact(context, payload) {
      try {
        fetch(`http://localhost:8080/contacts/${payload.id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        alert('Не удалось удалить контакт');
      }
    },
    editContact(context, payload) {
      try {
        fetch(`http://localhost:8080/contacts/${payload.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            phone: payload.phone,
          }),
        });
      } catch (error) {
        alert('Не удалось изменить контакт');
      }
    },
  },
};
