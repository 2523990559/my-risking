// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'

import '@assets/scss/reset.scss'

Vue.config.productionTip = false
Vue.prototype.$swiper = Swiper

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
