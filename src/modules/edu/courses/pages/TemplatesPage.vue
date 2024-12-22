<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MainMenu from "../components/MainMenu.vue";
import TemplatesTableModal from "../components/TemplatesTableModal.vue";
import BottomNavigationComponent from "../../../../components/BottomNavigationComponent.vue";

export default {
  name: "TemplatesPage",
  components: {
    MainMenu,
    TemplatesTableModal,
    BottomNavigationComponent,
  },
  data() {
    return {
      currentId: null,
      currentCheckedIds: [],
      checkedAll: false,
      isCreateModalVisible: false,
    };
  },
  computed: {
    ...mapState({
      items: state => state.templates.items,
      limit: state => state.templates.limit,
      total: state => state.templates.total,
      page: state => state.templates.currentPage,
      filters: state => state.templates.filters,
      checkedIds: state => state.templates.checkedIds,
    })
  },
  methods: {
    ...mapActions({
      init: "templates/init",
    }),
    ...mapMutations({
      setLimit: "templates/setLimit",
      setCurrentPage: "templates/setCurrentPage",
      setItemsChecked: "templates/setItemsChecked",
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
  },
  mounted() {
    this.init();
  }
}
</script>

<template>
  <main-menu tab-active="templates" />
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
        <th>Описание</th>
        <th>Привязанные стадии</th>
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
        <td
          v-if="item.stages.length"
          class="row-template-stages"
        >
          <ul class="row-template-stages__list">
            <li
              v-for="stage in item.stages"
              :key="stage.id"
              class="row-template-stages__item"
            >
              {{ stage.name }}
            </li>
          </ul>
        </td>
        <td v-else>
          <p class="no-data">
            Hет&nbsp;данных
          </p>
        </td>
        <td class="row-menu">
          <button
            class="row-menu__btn"
            @click.stop="currentId = item.id"
          />
          <templates-table-modal
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
