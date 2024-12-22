import { $client } from '@/api/http-client.js';
import { coursesRoutes } from '@/constants/api.js';
export const courses = {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    checkedIds: [],
    limit: 15,
    currentPage: 1,
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    setItemsChecked(state, items) {
      state.checkedIds = [];
      state.checkedIds.push(...items);
    },
    setLimit(state, currentLimit) {
      state.limit = currentLimit;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
  },
  actions: {
    init({dispatch}) {
      dispatch('fetch');
    },
    async fetch({ commit, state }) {
      await $client.get(coursesRoutes.list)
        .then((response) => {
        commit('SET_ITEMS', response.data.items);
        state.total = response.data.total;
      }).catch((error) => {
        console.log(error)
      })
    },
  },
};
