<template>
  <VDialog
    v-model="showDialog"
    max-width="600px"
  >
    <VCard>
      <VCardTitle>
        <span class="headline">Location</span>
      </VCardTitle>
      <VCardText>
        <VContainer grid-list-md>
          <VForm v-model="formModel">
            <VTextField
              v-model="locationModel.name"
              label="Name *"
              required
              :rules="nameRules"
            />
            <VTextField
              v-model="locationModel.lat"
              label="Latitude *"
              required
              :rules="latRules"
            />
            <VTextField
              v-model="locationModel.long"
              label="Longitude *"
              required
              :rules="longRules"
            />
            <VSwitch
              v-model="locationModel.isOpen"
              label="Open"
            />
          </VForm>
        </VContainer>
        <small>*indicates required field</small>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="blue darken-1"
          flat
          @click="$emit('cancel')"
        >
          Close
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          :disabled="!formModel"
          @click="$emit('submit', parseLocation(locationModel))"
        >
          Save
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
export default {
  name: 'LocationModalForm',
  props: {
    location: {
      required: false,
      type: Object,
      default: () => {},
    },
    show: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      locationModel: {
        name: '',
        lat: null,
        long: null,
        isOpen: false,
      },
      formModel: false,
      nameRules: [
        value => !!value || 'Name is required',
      ],
      latRules: [
        value => !!value || 'Latitude is required',
        value => (Number(value) > -90 && Number(value) < 90) || 'Latitud must be between -90 and 90',
      ],
      longRules: [
        value => !!value || 'Longitude is required',
        value => (Number(value) > -180 && Number(value) < 180) || 'Longitude must be between -180 and 180',
      ],
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set() {
        this.$emit('cancel');
      },
    },
  },
  methods: {
    parseLocation(location) {
      return {
        ...location,
        lat: Number(location.lat),
        long: Number(location.long),
      };
    },
  },
};
</script>
