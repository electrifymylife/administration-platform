<script>
export default {
  name: "HashtagsTableModal",
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
    <li class="icon-edit">
      Редактировать
    </li>
    <li class="icon-trash-can">
      Удалить раздел
    </li>
  </ul>
</template>
