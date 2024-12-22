import { createStore } from 'vuex';
import { courses } from '../modules/edu/courses/store/courses';
import { challenges } from '../modules/edu/courses/store/challenges';
import { hashtags } from "../modules/edu/courses/store/hashtags";
import { templates } from "../modules/edu/courses/store/templates";

const store = createStore({
  modules: {
    courses,
    challenges,
    hashtags,
    templates,
  },
});

export default store;
