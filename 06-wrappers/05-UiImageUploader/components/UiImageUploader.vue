<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': loading }" :style="imageUrl">
      <span class="image-uploader__text">{{ imageText }}</span>
      <input
        ref="fileInput"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="setImage"
        @click="remove"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
      required: false,
    },
    uploader: {
      type: Function,
      required: false,
    },
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      loading: false,
      image: this.preview,
    };
  },

  computed: {
    previewText() {
      return this.image ? 'Удалить изображение' : 'Загрузить изображение';
    },

    imageText() {
      return this.loading ? 'Загрузка...' : this.previewText;
    },

    imageUrl() {
      return {
        '--bg-url': `url('${this.image}')`,
      };
    },
  },

  methods: {
    setImage($event) {
      const file = $event.target.files[0];
      this.$emit('select', file);

      if (this.uploader) {
        this.loading = true;
        this.uploader(file)
          .then((response) => {
            this.$emit('upload', response);
            this.image = response.image;
          })
          .catch((error) => {
            this.$emit('error', error);
            this.resetImage();
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.image = URL.createObjectURL(file);
      }
    },

    remove($event) {
      if (this.image) {
        $event.preventDefault();
      }
      if (!this.loading) {
        this.$emit('remove');
      }

      this.resetImage();
    },

    resetImage() {
      this.image = null;
      this.$refs.fileInput.value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
