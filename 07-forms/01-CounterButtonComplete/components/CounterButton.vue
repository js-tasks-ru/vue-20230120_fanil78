<template>
  <button @click="handleClick">{{ currentCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  emits: ['update:count'],
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      currentCount: this.count,
    };
  },

  methods: {
    handleClick() {
      this.currentCount++;
      this.$emit('update:count', this.currentCount);
    },
  },

  watch: {
    count(newValue) {
      this.currentCount = newValue;
    },
  },
};
</script>
