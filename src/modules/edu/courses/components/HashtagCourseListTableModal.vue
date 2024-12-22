<script>
export default {
  name: "HashtagCourseListTableModal",
  props: {
    modalVisibility: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  }
}
</script>

<template>
  <ul
    v-click-outside="closeModal"
    class="modal-menu"
    :class="{'active': modalVisibility}"
  >
    <li class="icon-unlink">
      Отвязать
    </li>
    <li class="icon-scholar-hat">
      Страница курса
    </li>
  </ul>
</template>
