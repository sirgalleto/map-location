<template>
  <div id="app">
    <span v-if="error">
      {{ error }}
    </span>
    <ul>
      <li v-for="location in locations" :key="location.id">
        {{ location.name }} : {{location.lat}},{{location.long}} : {{ location.isOpen ? 'open' : 'closed' }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'app',
  created() {
    this.fetchLocations()
  },
  computed: {
    ...mapState('locations', {
      locations: state => state.items,
      error: state => state.fetchingError
    })
  },
  methods: {
    ...mapActions('locations', {
      fetchLocations: 'fetchLocations',
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
