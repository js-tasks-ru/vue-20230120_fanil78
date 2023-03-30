<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="remove">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="agendaItemLocal.type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" v-model="agendaItemLocal.startsAt" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" v-model="agendaItemLocal.endsAt" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup :label="titleText">
      <UiInput name="title" v-model="agendaItemLocal.title" />
    </UiFormGroup>
    <UiFormGroup label="Докладчик" v-if="talk">
      <UiInput name="speaker" v-model="agendaItemLocal.speaker" />
    </UiFormGroup>
    <UiFormGroup label="Описание" v-if="talk || other">
      <UiInput multiline name="description" v-model="agendaItemLocal.description" />
    </UiFormGroup>
    <UiFormGroup label="Язык" v-if="talk">
      <UiDropdown
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
        v-model="agendaItemLocal.language"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  emits: ['remove', 'update:agendaItem'],

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      agendaItemLocal: { ...this.agendaItem },
    };
  },

  computed: {
    talk() {
      return this.agendaItemLocal.type === 'talk';
    },

    other() {
      return this.agendaItemLocal.type === 'other';
    },

    titleText() {
      if (this.talk) {
        return 'Тема';
      } else if (this.other) {
        return 'Заголовок';
      } else {
        return 'Нестандартный текст (необязательно)';
      }
    },
  },

  methods: {
    remove() {
      this.$emit('remove');
    },

    timeInHourAndMinutes(fullTime) {
      const hours = parseInt(fullTime);
      const minutes = parseInt(fullTime.substring(3));

      return { hours, minutes };
    },

    timeDifferenceTimeStamp(newValue, oldValue) {
      const newTime = this.timeInHourAndMinutes(newValue);
      const oldTime = this.timeInHourAndMinutes(oldValue);

      const newTimeDate = new Date(1970, 1, 1, newTime.hours, newTime.minutes);
      const oldTimeDate = new Date(1970, 1, 1, oldTime.hours, oldTime.minutes);

      return newTimeDate.getTime() - oldTimeDate.getTime();
    },

    endTimeTimeStamp() {
      const endTimeTimestamp = new Date(
        1970,
        1,
        1,
        this.timeInHourAndMinutes(this.agendaItemLocal.endsAt).hours,
        this.timeInHourAndMinutes(this.agendaItemLocal.endsAt).minutes,
      ).getTime();

      return endTimeTimestamp;
    },

    timeToString(time) {
      const tzoffset = new Date().getTimezoneOffset() * 60000;
      const localISOTime = new Date(time - tzoffset).toISOString().substring(11, 16);
      return localISOTime;
    },
  },

  watch: {
    agendaItemLocal: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.agendaItemLocal });
      },
    },

    'agendaItemLocal.startsAt'(newValue, oldValue) {
      const timeDifference = this.timeDifferenceTimeStamp(newValue, oldValue);
      const newEndTime = this.endTimeTimeStamp() + timeDifference;
      const newEndTimeString = this.timeToString(newEndTime);

      this.agendaItemLocal = { ...this.agendaItemLocal, endsAt: newEndTimeString };
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
