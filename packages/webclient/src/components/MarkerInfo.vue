<template>
  <div class="marker-info-body">
    <h3>
      {{ name }}
    </h3>
    <small>
      {{ lat }},{{ long }} <br>
      <b>{{ isOpen ? 'open' : 'closed' }}</b>
    </small>
  </div>
</template>

<script>
export default {
  name: 'MarkerInfo',
  props: {
    name: {
      default: '',
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.marker-info-body {
  min-width: 150px;
}
</style>
