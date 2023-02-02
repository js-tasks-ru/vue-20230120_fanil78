import { defineComponent } from "./vendor/vue.esm-browser.js";

export default defineComponent({
  name: "CounterButton",

  props: {
    count: {
      default: 0,
      type: Number,
    },
  },

  methods: {
    countClick() {
      this.$emit("update:count", this.count + 1);
    },
  },

  template: `<button type="button" @click="countClick">{{ count }}</button>`,
});
