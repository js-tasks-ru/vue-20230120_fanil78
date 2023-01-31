import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  template: `<button type="button" @click='countClicks'>{{count}}</button>`,

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
}).mount('#app');
