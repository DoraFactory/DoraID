import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'

import VueToast from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast, {
  duration: 6000,
})

Vue.config.productionTip = false

new Vue({
  // router,
  store,
  render: (h) => h(App),
}).$mount('#app')
