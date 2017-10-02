import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/index'

Vue.use(Vuetify)

const app = new Vue({
  el: '#app',
  data: {
    sharedData: {
      currentUtaite: undefined,
    },
  },
  render: h => h(App),
  router,
})
