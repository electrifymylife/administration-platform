<script>
export default {
  name: "TemplatesTableModal",
  props: {
    modalVisibility: {
      type: Boolean,
      default: false,
    },
  },
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
    <li
      class="icon-clones"
    >
      Клонировать сценарий
    </li>
    <li
      class="icon-trash-can"
    >
      Удалить сценарий
    </li>
  </ul>
</template>
