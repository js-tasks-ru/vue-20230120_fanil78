<template>
  <UiInput :step="step" :type="type" :model-value="value" @change="updateDate">
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
    },
    step: {
      type: String,
    },
  },


  components: { UiInput },

  computed: {
    value() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }
      const date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return date.substring(0, 10);
      } else if (this.type === 'datetime-local') {
        return date.substring(0, 16);
      } else if (this.type === 'time') {
        return this.step && this.step % 60 !== 0
          ? date.substring(11, 19)
          : date.substring(11, 16);
      }
      return '';
    },
  },

  methods: {
    updateDate($event) {
      this.$emit('update:modelValue', $event.target.valueAsNumber);
    },
  },
};
</script>
