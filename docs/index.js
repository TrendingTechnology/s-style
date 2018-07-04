import Vue from 'vue'
import SimpleStyle from '../src/index.js'

import router from './router/index.js'
import App from './App.vue'

Vue.use(SimpleStyle)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

