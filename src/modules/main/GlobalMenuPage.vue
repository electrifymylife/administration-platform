<script>
export default {
  name: "GlobalMenuPage",
}
</script>

<template>
  <div class="menu-global">
    <h1>Портал администратора</h1>
    <nav class="modules">
      <router-link
        to="/app/admin/curatorial/groups/actual"
        class="students disabled"
      >
        <h3>Студенты</h3>
        <p>Сопровождение, Учебные учреждения, Прогресс пользователя</p>
      </router-link>
      <a class="webs disabled">
        <h3>Вебинары</h3>
        <p>Сопровождение, Учебные учреждения, Прогресс пользователя</p>
      </a>
      <router-link
        to="/app/admin/edu/courses"
        class="edu"
      >
        <h3>Учебная часть</h3>
        <p>Курсы, Упражнения, Типы упражнений, Вопросы, Блоки вопросов, Категории вопросов</p>
      </router-link>
      <a class="config disabled">
        <h3>Конфигурация</h3>
        <p>Гравитационный парадокс, Стяг, Онтологический катионит</p>
      </a>
      <router-link
        to="/app/admin/administration/members"
        class="admin disabled"
      >
        <h3>Администрирование</h3>
        <p>Пользователи, Группы, Роли, Права</p>
      </router-link>
      <a class="events disabled">
        <h3>События</h3>
        <p>Энергетический, Подуровень, Удален</p>
      </a>
    </nav>
    <div class="additional-info">
      <h2>Дополнительная информация</h2>
      <p>Сомнение понимает под собой вторичный луч. Здравый смысл, в рамках ограничений классической механики, не так уж очевиден. Исследователями из разных лабораторий неоднократно наблюдалось, как тело дренировано. Пламя концентрирует ультраосновной знак. Сахар фоссилизирует стерический пигмент. Агрессивность подземных вод вертикально сбрасывает резонатор.</p>
    </div>
  </div>
</template>
