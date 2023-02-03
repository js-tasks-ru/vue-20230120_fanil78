import { defineComponent } from "../vendor/vue.esm-browser.js";
import MeetupAgendaItem from "./MeetupAgendaItem.js";

export default defineComponent({
  name: "MeetupAgenda",

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  components: {
    MeetupAgendaItem,
  },

  template: ` 
    <ul class="agenda">
      <li v-for="(item, index) in agenda" class="agenda__item" :key="index">
        <MeetupAgendaItem :agenda-item='item'/>
      </li>
    </ul>`,
});
