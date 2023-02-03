import { defineComponent } from "../vendor/vue.esm-browser.js";
import UiContainer from "./UiContainer.js";
import UiAlert from "./UiAlert.js";
import { fetchMeetupById } from "../meetupService.js";

import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: "PageMeetup",

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isLoading: false,
      meetup: {},
      error: "",
    };
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  methods: {
    toggleLoader() {
      this.isLoading = !this.isLoading;
    },

    getMeetup(meetupId) {
      fetchMeetupById(meetupId)
        .then((response) => {
          this.handleResponse(response);
        })
        .catch((error) => {
          this.handleError(error);
        });
    },
    handleResponse(response) {
      this.meetup = response;
      this.toggleLoader();
    },
    handleError(error) {
      this.error = error.message;
      this.toggleLoader();
    },

    resetError() {
      this.error = "";
    },
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(meetupId) {
        this.resetError();
        this.toggleLoader();
        this.getMeetup(meetupId);
      },
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="!isLoading && !error" :meetup="meetup" />

      <UiContainer v-else-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else>
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
