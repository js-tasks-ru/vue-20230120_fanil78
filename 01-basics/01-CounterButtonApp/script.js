import { createApp } from "./vendor/vue.esm-browser.js";

// Создайте Vue приложение

createApp({
  template: `<button type="button" @click="countClicks">{{ count }}</button>`,

  data() {
    return {
      count: 0,
    };
  },

  methods: {
    countClicks() {
      this.count++;
    },
  },
}).mount("#app");
