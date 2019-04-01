<template>
  <div class="marker-info-body">
    <VCard>
      <VCardTitle primary-title>
        <div>
          <h3 class="headline mb-0">
            {{ location.name }}
          </h3>
          <div>
            {{ location.lat }},{{ location.long }}
          </div>
          <b>{{ location.isOpen ? 'open' : 'closed' }}</b>
        </div>
      </VCardTitle>
      <VCardActions>
        <VBtn
          flat
          small
          color="gray"
          @click="onEdit"
        >
          Edit
        </VBtn>
        <VBtn
          flat
          small
          color="red"
          @click.stop="onDelete"
        >
          Delete
        </VBtn>
      </VCardActions>
    </VCard>
    <Confirm
      :title="`Do you want to remove the location ${location.name}?`"
      :show="showDeleteConfirmation"
      @cancel="onCancelDelete"
      @confirm="onConfirmDelete"
    >
      You won't longer see this location
    </Confirm>

    <LocationModalForm
      :show="showEditForm"
      :location="location"
      @submit="onSubmitUpdate($event)"
      @cancel="toggleEditForm"
    />
  </div>
</template>

<script>
import Confirm from '@/components/Confirm.vue';
import LocationModalForm from '@/components/LocationModalForm.vue';

export default {
  name: 'MarkerInfo',
  components: {
    Confirm,
    LocationModalForm,
  },
  props: {
    location: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showDeleteConfirmation: false,
      showEditForm: false,
    };
  },
  methods: {
    toggleConfirmation() {
      this.showDeleteConfirmation = !this.showDeleteConfirmation;
    },
    toggleEditForm() {
      this.showEditForm = !this.showEditForm;
    },
    onDelete() {
      this.toggleConfirmation();
    },
    onEdit() {
      this.toggleEditForm();
    },
    onCancelDelete() {
      this.toggleConfirmation();
    },
    onConfirmDelete() {
      this.toggleConfirmation();
      this.$emit('delete', this.location);
    },
    onSubmitUpdate(location) {
      this.toggleEditForm();
      this.$emit('update', location);
    },
  },
};
</script>

<style scoped>
.marker-info-body {
  min-width: 150px;
}
</style>


<style>
/* Not scoped to override mapbox styles */
.mapboxgl-popup-content {
  min-width: 200px;
  padding: 0;
}
</style>
