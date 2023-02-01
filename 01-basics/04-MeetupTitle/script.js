import { createApp } from "./vendor/vue.esm-browser.js";

const API_URL = "https://course-vue.javascript.ru/api";

createApp({
  template: `
    <div>
        <label v-for="id in 5" :key="id"><input type="radio" name="meetupId" :value="id" v-model=meetupId /> {{ id }} </label>

        <hr />

        <h3>{{ meetup.title }}</h3>
      </div>
`,

  data() {
    return {
      meetupId: null,
      meetup: {},
    };
  },

  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    },

    async setMeetupInfo(id) {
      this.meetup = await this.fetchMeetupById(id);
    },
  },

  watch: {
    meetupId(id) {
      this.setMeetupInfo(id);
    },
  },
}).mount("#app");
