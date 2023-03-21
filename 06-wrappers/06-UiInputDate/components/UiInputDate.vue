<template>
  <UiInput :step="step" :type="type" :value="modelValue" @change="updateDate">
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>
    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',
  emits: ['update:modelValue'],

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      required: true,
    },
    step: {
      type: String,
    },
  },

  components: { UiInput },

  methods: {
    updateDate($event) {
      this.$emit('update:modelValue', $event.target.valueAsNumber);
    },
  },
};
</script>
