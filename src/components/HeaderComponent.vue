<script>
import HeaderAdminForm from "./HeaderAdminForm.vue";
export default {
  name: "HeaderComponent",
  components: {
    HeaderAdminForm
  },
  data() {
    return {
      modalVisibility: false
    }
  }
}
</script>

<template>
  <header class="header">
    <a
      class="header__home"
      href="/"
    ><img
      src="https://fs.advance.ru/landing-pages/icons/advance-logo/logo_2021.svg"
      alt="Advance"
    ></a>
    <div class="header__menu">
      <button
        @click.stop="modalVisibility = !modalVisibility"
        class="header__menu-user"
      >
        Администратор
      </button>
      <header-admin-form
        :modal-visibility="modalVisibility"
        @close-modal="modalVisibility = false"
      />
    </div>
  </header>
</template>
