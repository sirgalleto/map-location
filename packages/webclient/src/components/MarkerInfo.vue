<template>
  <div v-if="!editMode">
    <h3>
      {{ name }}
    </h3>
    <small>
      {{ lat }},{{ long }} <br/>
      <b>{{ isOpen ? 'open' : 'closed' }}</b>
    </small>
  </div>
  <div v-else>
    Hi, I'm in edit mode!
  </div>
</template>

<script>
export default {
  name: 'MarkerInfo',
  props: {
    editMode: {
      default: false,
      required: false,
      type: Boolean,
    },
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
