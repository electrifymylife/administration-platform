<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ChallengesTableModal from "../components/ChallengesTableModal.vue";
import MainMenu from "../components/MainMenu.vue";
import BottomNavigationComponent from "../../../../components/BottomNavigationComponent.vue";

export default {
  name: "ChallengesPage",
  components: {
    ChallengesTableModal,
    MainMenu,
    BottomNavigationComponent,
  },
  data() {
    return {
      currentId: null,
      difficulties: {
        1: { text: 'Элементарный', class: 'elementary' },
        2: { text: 'Простой', class: 'easy' },
        3: { text: 'Средний', class: 'middle' },
        4: { text: 'Сложный', class: 'hard' },
        5: { text: 'Экстра', class: 'extra' },
      },
    };
  },
  computed: {
    ...mapState({
      items: state => state.challenges.items,
      limit: state => state.challenges.limit,
      total: state => state.challenges.total,
      page: state => state.challenges.currentPage,
    })
  },
  methods: {
    ...mapActions({
      init: "challenges/init",
    }),
    ...mapMutations({
      setLimit: "challenges/setLimit",
      setCurrentPage: "challenges/setCurrentPage",
      setFilters: "challenges/setFilters",
    }),
    updateLimit(limit) {
      this.setCurrentPage(1);
      this.setLimit(limit);
    },
    nextPage() {
      this.setCurrentPage(this.page + 1);
    },
    prevPage() {
      this.setCurrentPage(this.page - 1);
    },
    firstPage() {
      this.setCurrentPage(1);
    },
    lastPage() {
      this.setCurrentPage(Math.ceil(this.total / this.limit));
    },
    difficultyClass(difficulty) {
      return this.difficulties[difficulty] ? this.difficulties[difficulty].class : null;
    },
    difficultyText(difficulty) {
      return this.difficulties[difficulty] ? this.difficulties[difficulty].text : null;
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<template>
  <main-menu tab-active="challanges" />
  <table class="page-table">
    <thead>
      <tr>
        <th class="row-img" />
        <th class="row-record-name">
          Название рекорда
        </th>
        <th class="row-cat">
          Категория
        </th>
        <th>Описание</th>
        <th>Курс</th>
        <th class="row-level">
          Уровень сложности
        </th>
        <th class="row-menu" />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.id"
        :class="{ disabled: item.deleted_at }"
      >
        <td
          v-if="item.image"
          class="row-img"
        >
          <div class="row-img__wrap">
            <img
              :src="item.image"
              alt="Изображение текущего рекорда"
            >
          </div>
        </td>
        <td
          v-else
          class="row-img"
        />
        <td class="row-record-name">
          {{ item.title }}
        </td>
        <td
          v-if="item.category_name"
          class="row-cat"
        >
          {{ item.category_name }}
        </td>
        <td
          v-else
          class="row-cat"
        >
          <p class="no-data">
            Hет&nbsp;данных
          </p>
        </td>
        <td v-if="item.description">
          {{ item.description }}
        </td>
        <td v-else>
          <p class="no-data">
            Hет&nbsp;данных
          </p>
        </td>
        <td v-if="item.course_name">
          {{ item.course_name }}
        </td>
        <td v-else>
          <p class="no-data">
            Hет&nbsp;данных
          </p>
        </td>
        <td class="row-level">
          <p
            class="el-state level"
            :class="difficultyClass(item.difficulty)"
          >
            {{ difficultyText(item.difficulty) }}
          </p>
        </td>
        <td class="row-menu">
          <button
            class="row-menu__btn"
            @click.stop="currentId = item.id"
          />
          <challenges-table-modal
            :id="item.id"
            :modal-visibility="item.id === currentId"
            @close-modal="currentId = null"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <bottom-navigation-component
    :total="total"
    :limit="limit"
    :current-page="page"
    @set-limit="updateLimit"
    @next-page="nextPage"
    @prev-page="prevPage"
    @first-page="firstPage"
    @last-page="lastPage"
  />
</template>
