<script>
import HeaderComponent from "../components/HeaderComponent.vue";

export default {
  name: 'MainLayout',
  components: {
    HeaderComponent,
   }
};
</script>

<template>
  <div class="layout-body-main">
    <header-component />
    <section class="layout-admin">
      <slot />
    </section>
  </div>
</template>
