import { defineComponent } from "../vendor/vue.esm-browser.js";
import { agendaItemIcons, agendaItemDefaultTitles } from "../meetupService.js";

export default defineComponent({
  name: "MeetupAgendaItem",

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    agendaItemTitle() {
      return this.agendaItem.title ? this.agendaItem.title : agendaItemDefaultTitles[this.agendaItem.type];
    },
    agendaTime() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
    hasSpeaker() {
      return this.agendaItem.type === "talk";
    },
    iconUrl() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconUrl" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{agendaTime }} </div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">
          {{ agendaItemTitle }}
        </h3>
        <p v-if="hasSpeaker" class="agenda-item__talk">
          <span>
            {{ agendaItem.speaker }}
          </span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">
          {{ agendaItem.language }}
          </span>
        </p>
        <p>
          {{ agendaItem.description }}
        </p> 
      </div>
    </div>`,
});
