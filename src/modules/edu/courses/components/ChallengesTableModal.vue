<script>

export default {
  name: "ChallengesTableModal",
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
  <form
    v-click-outside="closeModal"
    class="modal-menu"
    :class="{ 'active': modalVisibility }"
  >
    <div class="modal admin">
      <div class="wrapper">
        <ul>
          <li class="icon-edit">
            Редактировать
          </li>
          <li class="icon-trash-can">
            Удалить рекорд
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>
