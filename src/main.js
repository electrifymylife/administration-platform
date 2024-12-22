import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/style.scss';

const app = createApp(App)

app.directive('click-outside', {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {

        if (!(el == event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  }
)

app.directive('focus', {
  mounted: function (el) {
    el.focus()
  }
});

app.use(router)
app.use(store)
app.mount('body')
