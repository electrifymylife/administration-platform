import { $client } from '@/api/http-client.js';
import {templatesRoutes} from '@/constants/api.js';

export const templates = {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    limit: 15,
    checkedIds: [],
    currentPage: 1,
  },
  mutations: {
    setItems(state, items) {
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
    init({ dispatch }) {
      dispatch('fetch');
    },
    async fetch({ commit, state }) {
      await $client.get(templatesRoutes.list)
        .then((response) => {
        console.log(response)
        commit('setItems', response.data.items);
        state.total = response.data.total;
      }).catch((error) => {
        console.log(error)
      });
    },
  },
};
