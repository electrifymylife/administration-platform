import { $client } from '@/api/http-client.js';
import { hashtagsRoutes } from '@/constants/api.js';
export const hashtags = {
  namespaced: true,
  state: {
    items: [],
    currentHashtag: {},
    currentHashtagCourseList: {},
    total: 0,
    checkedIds: [],
    limit: 15,
    currentPage: 1,
    filters: {},
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setCurrentHashtag(state, items) {
      state.currentHashtag = items;
    },
    setCurrentHashtagCourseList(state, items) {
      state.currentHashtagCourseList = items;
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
    setFilters(state, filters) {
      state.filters = filters;
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch('fetch');
    },
    async fetch({ commit, state }) {

      const formattedFilters = {};

      Object.keys(state.filters).forEach(key => {
        state.filters[key].forEach((filter, index) => {
          formattedFilters[`filters[${key}][${index}]`] = filter.value;
        });
      });

      await $client.get(hashtagsRoutes.list)
        .then((response) => {
        commit('setItems', response.data.items);
        state.total = response.data.total;
      }).catch((error) => {
        console.log(error)
      });
    },
    async fetchHashtags({ commit, state }, hashtagId) {
      await $client.get(hashtagsRoutes.list, {
        params: {
          limit: state.limit,
          page: state.currentPage,
        }
      }).then((response) => {
        let currentHashtag = '';
        let currentHashtagCourseList = [];
        let currentHashtagCourseListTotal = 0;
        response.data.items.filter(item => {
          if (item.id === Number(hashtagId)) {
            currentHashtag = item.title;
            currentHashtagCourseList = item.courses;
            currentHashtagCourseListTotal = item.total;
          }
        })
        commit('setCurrentHashtag', currentHashtag);
        commit('setCurrentHashtagCourseList', currentHashtagCourseList);
        state.total = currentHashtagCourseListTotal;
      }).catch((error) => {
        console.log(error)
      });
    },
  },
};
