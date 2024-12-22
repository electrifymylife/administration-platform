<script>
export default {
  name: "HeaderAdminForm",
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
    <li class="icon-user-login disabled">
      Зайти как Администратор
    </li>
    <li class="icon-user-login">
      Зайти как пользователь
    </li>
    <li class="icon-logout">
      Выйти
    </li>
  </ul>
</template>
