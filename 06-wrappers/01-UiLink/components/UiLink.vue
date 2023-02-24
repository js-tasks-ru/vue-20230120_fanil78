<template>
  <component :is="linkType" class="link">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'UiLink',
  props: {
    tag: {
      type: String,
      default: 'router-link',
    }
  },

  computed: {
    linkType() {
      return this.tag === 'router-link' ? 'RouterLink' : 'a'
    }
  }

};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
