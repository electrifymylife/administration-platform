<script>
export default {
  name: "CoursesTableModal",
  props: {
    modalVisibility: {
      type: Boolean,
      default: false,
    },
    courseId: {
      type: Number,
      default: null,
    }
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
    <li class="icon-list">
      Список пользователей
    </li>
    <li class="icon-list">
      Список групп
    </li>
    <li class="icon-edit">
      <router-link :to="`/app/admin/edu/course/${courseId}`">
        Редактировать
      </router-link>
    </li>
  </ul>
</template>
