import { createStore } from 'vuex';

import authStore from './auth.js';
import contactsStore from './contacts.js';

export default createStore({
  modules: {
    auth: authStore,
    contacts: contactsStore,
  },
});
