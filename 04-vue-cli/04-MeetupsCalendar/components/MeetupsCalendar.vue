<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ selectedMonthOfYearTitle }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <template v-if="daysFromPreviousMonth.length">
        <div
          v-for="(day, index) in daysFromPreviousMonth"
          :key="index"
          class="calendar-view__cell calendar-view__cell_inactive"
          tabindex="0"
        >
          <div class="calendar-view__cell-day">{{ day.getDate() }}</div>
          <div class="calendar-view__cell-content">
            <a
              v-for="meetup in meetupsOfThisDay(day)"
              :key="meetup.date"
              :href="`/meetups/${meetup.id}`"
              class="calendar-event"
              >{{ meetup.title }}
            </a>
          </div>
        </div>
      </template>
      <div v-for="(day, index) in selectedMonthDays" :key="index" class="calendar-view__cell" tabindex="0">
        <div class="calendar-view__cell-day">{{ day.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <a
            v-for="meetup in meetupsOfThisDay(day)"
            :key="meetup.date"
            :href="`/meetups/${meetup.id}`"
            class="calendar-event"
            >{{ meetup.title }}
          </a>
        </div>
      </div>
      <!-- -->
      <template v-if="daysFromNextMonth.length">
        <div
          v-for="(day, index) in daysFromNextMonth"
          :key="index"
          class="calendar-view__cell calendar-view__cell_inactive"
          tabindex="0"
        >
          <div class="calendar-view__cell-day">{{ day.getDate() }}</div>
          <div class="calendar-view__cell-content">
            <a
              v-for="meetup in meetupsOfThisDay(day)"
              :key="meetup.date"
              :href="`/meetups/${meetup.id}`"
              class="calendar-event"
              >{{ meetup.title }}
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { setMonth } from "date-fns";

export default {
  name: "MeetupsCalendar",

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    daysFromPreviousMonth() {
      const dayOfWeekForFirstDayOfSelectedMonth = this.selectedMonthDays[0].getDay();
      if (!dayOfWeekForFirstDayOfSelectedMonth) {
        return this.daysOfPreviousMonth.slice(-6);
      } else if (dayOfWeekForFirstDayOfSelectedMonth === 1) {
        return [];
      } else {
        return this.daysOfPreviousMonth.slice(-(dayOfWeekForFirstDayOfSelectedMonth - 1));
      }
    },
    daysOfPreviousMonth() {
      const days = [];
      const previousMonthYear = this.currentSelectedMonth ? this.currentSelectedYear : this.currentSelectedYear - 1;
      const previousMonth = this.currentSelectedMonth ? this.currentSelectedMonth - 1 : 11;

      for (let i = 1; i < 32; i++) {
        const day = new Date(previousMonthYear, previousMonth, i);
        if (day.getMonth() === previousMonth) {
          days.push(day);
        } else {
          break;
        }
      }
      return days;
    },

    daysFromNextMonth() {
      const dayOfWeekForLastDayOfCurrentMonth = this.selectedMonthDays[this.selectedMonthDays.length - 1].getDay();
      if (!dayOfWeekForLastDayOfCurrentMonth) {
        return [];
      } else {
        return this.daysOfNextMonth.slice(0, 7 - dayOfWeekForLastDayOfCurrentMonth);
      }
    },

    daysOfNextMonth() {
      const days = [];
      const lastMonthOfYear = this.currentSelectedMonth === 11;
      const nextMonthYear = lastMonthOfYear ? this.currentSelectedYear + 1 : this.currentSelectedYear;
      const nextMonth = lastMonthOfYear ? 0 : this.currentSelectedMonth + 1;

      for (let i = 1; i < 32; i++) {
        const day = new Date(nextMonthYear, nextMonth, i);

        if (day.getMonth() === nextMonth) {
          days.push(day);
        } else {
          break;
        }
      }
      return days;
    },

    selectedMonthDays() {
      const days = [];
      for (let i = 1; i < 32; i++) {
        const day = new Date(this.currentSelectedYear, this.currentSelectedMonth, i);
        if (day.getMonth() === this.currentSelectedMonth) {
          days.push(day);
        } else {
          break;
        }
      }
      return days;
    },

    currentSelectedYear() {
      return this.date.getFullYear();
    },
    currentSelectedMonth() {
      return this.date.getMonth();
    },

    currentSelectedDay() {
      return this.date.getDate();
    },

    selectedMonthOfYearTitle() {
      return this.date.toLocaleDateString(navigator.language, {
        month: "long",
        year: "numeric",
      });
    },
  },

  methods: {
    meetupsOfThisDay(day) {
      const meetups = this.meetups.filter(
        (item) => new Date(item.date).toLocaleDateString() === new Date(day).toLocaleDateString(),
      );
      return meetups;
    },

    nextMonth() {
      this.date = setMonth(
        new Date(this.currentSelectedYear, this.currentSelectedMonth, this.currentSelectedDay),
        +this.currentSelectedMonth + 1,
      );
    },

    previousMonth() {
      this.date = setMonth(
        new Date(this.currentSelectedYear, this.currentSelectedMonth, this.currentSelectedDay),
        +this.currentSelectedMonth - 1,
      );
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url("@/assets/icons/icon-pill-active.svg") left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
