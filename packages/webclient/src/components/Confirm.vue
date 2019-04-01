<template>
  <VDialog
    v-model="show"
    persistent
    max-width="290"
  >
    <VCard>
      <VCardTitle class="headline">
        {{ title }}
      </VCardTitle>

      <VCardText>
        <slot />
      </VCardText>

      <VCardActions>
        <VSpacer />

        <VBtn
          flat="flat"
          @click="$emit('cancel')"
        >
          Cancel
        </VBtn>

        <VBtn
          color="red"
          flat="flat"
          @click="$emit('confirm')"
        >
          Ok
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>
