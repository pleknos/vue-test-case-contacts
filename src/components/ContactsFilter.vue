<template>
  <section class="filter">
    <h2>Фильтр</h2>
    <div class="filter-inputs">
      <input type="text" placeholder="по имени" @keyup="setFilter($event, 'filterName')" @change="setFilter($event, 'filterName')">
      <input type="text" placeholder="по телефону" @keyup="setFilter($event, 'filterPhone')" @change="setFilter($event, 'filterName')">
      <input type="text" placeholder="по email" @keyup="setFilter($event, 'filterEmail')" @change="setFilter($event, 'filterName')">
    </div>
  </section>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filterName: '',
      filterEmail: '',
      filterPhone: '',
    };
  },
  methods: {
    setFilter(event, field) {
      this[field] = event.target.value;
      this.$emit('change-filter', { name: this.filterName, email: this.filterEmail, phone: this.filterPhone })
    }
  }
}
</script>

<style scoped>
  .filter-inputs input:not(:last-child) {
    margin-right: 10px;
  }
</style>