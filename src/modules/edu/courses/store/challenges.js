import { $client } from '@/api/http-client.js';
import { challengesRoutes } from '@/constants/api.js';

export const challenges = {
  namespaced: true,
  state: {
    items: [],
    total: 0,
    limit: 15,
    currentPage: 1,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
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

      await $client.get(challengesRoutes.list)
        .then((response) => {
        commit('setItems', response.data.items);
        state.total = response.data.total;
      }).catch((error) => {
        console.log(error)
      })
    },
  },
};
