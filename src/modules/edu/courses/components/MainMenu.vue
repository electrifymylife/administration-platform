<script>
export default {
  name: "MainMenu",
  props: {
    tabActive: {
      type: String,
      default: 'courses',
    }
  }
}
</script>

<template>
  <div class="top-level-menu">
    <nav class="top-level-menu__first">
      <router-link
        to="/"
        class="btn-home"
      />
      <a class="btn-module current">
        Учебная часть
      </a>
    </nav>
    <nav class="top-level-menu__second">
      <router-link
        to="/app/admin/edu/courses"
        class="active"
      >
        Курсы
      </router-link>
      <a>
        Учащиеся
      </a>
    </nav>
    <nav class="top-level-menu__third">
      <router-link to="/app/admin/edu/courses" :class="{'active': tabActive === 'courses'}">
        Список курсов
      </router-link>
      <router-link to="/app/admin/edu/courses/hashtags" :class="{'active': tabActive === 'hashtags'}">
        Хэштеги
      </router-link>
      <router-link to="/app/admin/edu/courses/templates" :class="{'active': tabActive === 'templates'}">
        Шаблоны сценариев
      </router-link>
      <router-link to="/app/admin/edu/courses/challenges" :class="{'active': tabActive === 'challenges'}">
        Рекорды
      </router-link>
    </nav>
  </div>
</template>
