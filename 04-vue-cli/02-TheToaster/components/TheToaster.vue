<template>
  <div class="toasts">
    <div v-for="(toast, index) in toasts" :key="index" class="toast" :class="`toast_${toast.type}`">
      <ui-icon class="toast__icon" :icon="$options.icons[toast.type]" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from "./UiIcon.vue";

export default {
  name: "TheToaster",
  components: { UiIcon },

  icons: {
    error: "alert-circle",
    success: "check-circle",
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    updateToasts(toast) {
      const toasts = [...this.toasts];
      toasts.push(toast);
      this.toasts = [...toasts];
    },

    success(message) {
      const toast = {
        type: "success",
        message: "",
      };
      toast.message = message;

      this.updateToasts(toast);
    },
    error(message) {
      const toast = {
        type: "error",
        message: "",
      };
      toast.message = message;
      this.updateToasts(toast);
    },
  },

  watch: {
    toasts() {
      setTimeout(() => {
        this.toasts.shift();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
