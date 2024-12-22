<script>
import MainLayout from './layouts/MainLayout.vue';
export default {
  name: 'App',
  components: {
    MainLayout,
  },
};
</script>

<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>
