<script>
import { mapState, mapActions, mapMutations } from "vuex";
import CoursesTableModal from "../components/CoursesTableModal.vue";
import MainMenu from "../components/MainMenu.vue";
import BottomNavigationComponent from "../../../../components/BottomNavigationComponent.vue"

export default {
  name: "CoursesPage",
  components: {
    MainMenu,
    CoursesTableModal,
    BottomNavigationComponent,
  },
  data() {
    return {
      currentId: null,
      currentSort: {
        id: 'asc',
        name: 'asc',
        created_at: 'asc'
      },
      currentCheckedIds: [],
      checkedAll: false
    }
  },
  computed: {
    ...mapState({
      items: state => state.courses.items,
      filters: state => state.courses.filters,
      checkedIds: state => state.courses.checkedIds,
      limit: state => state.courses.limit,
      total: state => state.courses.total,
      page: state => state.courses.currentPage,
    }),
  },
  methods: {
    ...mapActions({
      init: "courses/init",
    }),
    ...mapMutations({
      setItemsChecked: "courses/setItemsChecked",
      setLimit: "courses/setLimit",
      setCurrentPage: "courses/setCurrentPage",
      setFilters: "courses/setFilters",
    }),
    setCurrentSorting(type) {
      this.currentSort[type] === 'asc' ? this.currentSort[type] = 'desc' : this.currentSort[type] = 'asc';
    },
    setCurrentSortingClass(type) {
      if (this.items.length <= 1) {
        return 'disabled'
      }
      if (this.currentSort[type] === 'asc' || this.currentSort[type] === null) {
        return 'down'
      } else {
        return 'up'
      }
    },
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
    isChecked(id) {
      return this.checkedAll || this.currentCheckedIds.includes(id);
    },
  },
  mounted() {
    this.init();
  }
};
</script>

<template>
  <main-menu />
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
        <th class="row-id">
          <div class="row-sort">
            <button
              :class="setCurrentSortingClass('id')"
              class="row-sort__btn"
              @click="setCurrentSorting('id')"
            />
            <span>ID</span>
          </div>
        </th>
        <th>
          <div class="row-sort">
            <button
              :class="setCurrentSortingClass('name')"
              class="row-sort__btn"
              @click="setCurrentSorting('name')"
            />
            <span>Название</span>
          </div>
        </th>
        <th>Описание</th>
        <th class="row-date">
          <div class="row-sort">
            <button
              :class="setCurrentSortingClass('created_at')"
              class="row-sort__btn"
              @click="setCurrentSorting('created_at')"
            />
            <span>Дата создания</span>
          </div>
        </th>
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
              :checked="isChecked(item.id)"
              type="checkbox"
              @click="checkItem(item.id)"
            >
            <label :for="'check-' + item.id" />
          </div>
        </td>
        <td class="row-id">
          {{ item.id }}
        </td>
        <td>{{ item.name }}</td>
        <td v-if="item.description">
          <p class="row-trim">
            {{ item.description }}
          </p>
        </td>
        <td v-else>
          <p class="no-data">
            Hет&nbsp;данных
          </p>
        </td>
        <td class="row-date">
          <span class="row-date_created">{{ formatDate(item.created_at) }}</span>
          <span class="row-date_edited">{{ formatDate(item.updated_at) }}</span>
        </td>
        <td class="row-menu">
          <button
            class="row-menu__btn"
            @click.stop="currentId = item.id"
          />
          <courses-table-modal
            :modal-visibility="item.id === currentId"
            :course-id="item.id"
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
