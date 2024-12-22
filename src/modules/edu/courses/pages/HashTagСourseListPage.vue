<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MainMenu from "../components/MainMenu.vue";
import BottomNavigationComponent from "../../../../components/BottomNavigationComponent.vue";
import HashtagCourseListTableModal from "../components/HashtagCourseListTableModal.vue";
export default {
  name: "HashTagCourseListPage",
  components: {
    MainMenu,
    BottomNavigationComponent,
    HashtagCourseListTableModal
  },
  data() {
    return {
      currentId: null
    };
  },
  computed: {
    ...mapState({
      items: state => state.hashtags.currentHashtagCourseList,
      limit: state => state.hashtags.limit,
      total: state => state.hashtags.total,
      currentHashtag: state => state.hashtags.currentHashtag,
      currentPage: state => state.hashtags.currentPage,
    })
  },
  beforeMount() {
    this.fetchHashtags(this.$route.params.id);
    console.log(this.total)
    this.setCurrentPage(1);
    this.setLimit(15);
    this.reload(this.currentPage, this.limit);
  },
  methods: {
    ...mapActions({
      fetchHashtags: "hashtags/fetchHashtags",
      init: "hashtags/init"
    }),
    ...mapMutations({
      setLimit: "hashtags/setLimit",
      setCurrentPage: "hashtags/setCurrentPage",
    }),
    reload(params) {
      const query = this.prepareQueryParams(params);
      this.init(query);
      this.changeQueryParams(query);
    },
    prepareQueryParams() {
      const stateParams = {
        page: this.currentPage,
        limit: this.limit,
      };
      return {...stateParams};
    },
    changeQueryParams(query) {
      this.$router.push({query: query})
    },
    updateLimit(limit) {
      this.setCurrentPage(1);
      this.setLimit(limit);
      this.reload(this.limit);
    },
    nextPage() {
      // добавить проверку
      this.setCurrentPage(this.currentPage + 1);
      this.reload(this.currentPage);
    },
    prevPage() {
      // добавить проверку
      this.setCurrentPage(this.currentPage - 1);
      this.reload(this.currentPage);
    },
    firstPage() {
      this.setCurrentPage(1);
      this.reload(this.currentPage);
    },
    lastPage() {
      this.setCurrentPage(Math.ceil(this.total / this.limit));
      this.reload(this.currentPage);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: 'numeric',
        minute: 'numeric'
      });
    },
  },
}
</script>

<template>
  <main-menu tab-active="hashtags" />
  <div class="toolbar">
    <router-link to="/app/admin/edu/courses/hashtags" class="toolbar__link" />
    <h2 class="toolbar__title">Список курсов с<span> #{{ currentHashtag }}</span></h2>
  </div>
  <table class="page-table">
    <thead>
      <tr>
        <th>Название курса</th>
        <th>Дата привязки</th>
        <th class="row-menu" />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <td>{{ item.name }}</td>
        <td class="semi-bold">
          {{ formatDate(item.created_at) }}
        </td>
        <td class="row-menu">
          <button
            class="row-menu__btn"
            @click.stop="currentId = item.id"
          />
          <hashtag-course-list-table-modal
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
    :current-page="currentPage"
    @set-limit="updateLimit"
    @next-page="nextPage"
    @prev-page="prevPage"
    @first-page="firstPage"
    @last-page="lastPage"
  />
</template>
