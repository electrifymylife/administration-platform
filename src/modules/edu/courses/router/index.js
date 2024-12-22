import CoursesPage from '../pages/CoursesPage.vue';
import ChallengesPage from "../pages/ChallengesPage.vue";
import HashTagsPage from "../pages/HashTagsPage.vue";
import HashTagCourseListPage from "../pages/HashTagСourseListPage.vue";
import TemplatesPage from "../pages/TemplatesPage.vue";

export default [
    {
        path: '/app/admin/edu/courses',
        component: CoursesPage,
    },
    {
        path: "/app/admin/edu/courses/challenges",
        component: ChallengesPage
    },
    {
        path: '/app/admin/edu/courses/hashtags',
        component: HashTagsPage,
    },
    {
        path: '/app/admin/edu/courses/hashtags/:id/courses',
        component: HashTagCourseListPage,
    },
    {
        path: '/app/admin/edu/courses/templates',
        component: TemplatesPage,
    },
];
