<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MainMenu from "../components/MainMenu.vue";
import BottomNavigationComponent from "../../../../components/BottomNavigationComponent.vue";
import HashtagsTableModal from "../components/HashtagsTableModal.vue";

export default {
  name: "HashTagsPage",
  components: {
    MainMenu,
    BottomNavigationComponent,
    HashtagsTableModal
  },
  data() {
    return {
      currentId: null,
      currentCheckedIds: [],
      checkedAll: false
    };
  },
  computed: {
    ...mapState({
      items: state => state.hashtags.items,
      checkedIds: state => state.hashtags.checkedIds,
      limit: state => state.hashtags.limit,
      total: state => state.hashtags.total,
      page: state => state.hashtags.currentPage,
      filters: state => state.hashtags.filters,
    })
  },
  methods: {
    ...mapActions({
      init: "hashtags/init"
    }),
    ...mapMutations({
      setItemsChecked: "hashtags/setItemsChecked",
      setLimit: "hashtags/setLimit",
      setCurrentPage: "hashtags/setCurrentPage",
      setFilters: "hashtags/setFilters",
    }),
    checkItem(id) {
      const arr = this.currentCheckedIds;
      if (!arr.includes(id)) {
        arr.push(id)
      } else {
        arr.splice(arr.indexOf(id), 1)
      }
      this.setItemsChecked(arr)
    },
    checkAllItems() {
      this.checkedAll = !this.checkedAll;
      if (this.checkedAll) {
        this.currentCheckedIds = [];
        for (const item in this.items) {
          this.currentCheckedIds.push(this.items[item].id);
        }
      } else {
        this.currentCheckedIds = [];
      }
      this.setItemsChecked(this.currentCheckedIds)
    },
    getHashtagCoursesLink(id) {
      return `/app/admin/edu/courses/hashtags/${id}/courses`;
    },
    reload(updateKey) {
      const query = this.prepareQueryParams();

      if (updateKey) {
        query[updateKey] = this[updateKey];
      }

      this.$router.push({ query })
      this.init(query);
    },
    prepareQueryParams() {
      const currentQuery = this.$route.query;
      const formattedFilters = {};

      Object.keys(this.filters).forEach(key => {
        this.filters[key].forEach((filter, index) => {
          formattedFilters[`filters[${key}][${index}]`] = filter.value;
        });
      });

      const stateParams = {
        page: currentQuery.page || this.page,
        limit: currentQuery.limit || this.limit,
        ...formattedFilters,
      };
      return { ...stateParams };
    },
    updateLimit(limit) {
      this.setCurrentPage(1);
      this.setLimit(limit);
      this.reload('limit');
    },
    nextPage() {
      this.setCurrentPage(this.page + 1);
      this.reload('page');
    },
    prevPage() {
      this.setCurrentPage(this.page - 1);
      this.reload('page');
    },
    firstPage() {
      this.setCurrentPage(1);
      this.reload('page');
    },
    lastPage() {
      this.setCurrentPage(Math.ceil(this.total / this.limit));
      this.reload('page');
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<template>
  <main-menu tab-active="hashtags" />
  <table class="page-table">
    <thead>
      <tr>
        <th class="row-check">
          <div class="input-check center single-check">
            <input
              id="check-all"
              type="checkbox"
              @click="checkAllItems"
            >
            <label for="check-all" />
          </div>
        </th>
        <th>Название</th>
        <th>Количество связанных курсов</th>
        <th class="row-menu" />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.id"
      >
        <td class="row-check">
          <div class="input-check big center single-check">
            <input
              :id="'check-' + item.id"
              :value="item.id"
              :checked="checkedAll"
              type="checkbox"
              @click="checkItem(item.id)"
            >
            <label :for="'check-' + item.id" />
          </div>
        </td>
        <td>{{ item.title }}</td>
        <td class="row-linked">
          <span>{{ item.courses.length }}</span>
          <router-link
            :to="getHashtagCoursesLink(item.id)"
            class="link-simple"
          >
            смотреть список
          </router-link>
        </td>
        <td class="row-menu">
          <button
            class="row-menu__btn"
            @click.stop="currentId = item.id"
          />
          <hashtags-table-modal
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
