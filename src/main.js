import Vue from 'vue'
import App from './App'
import Mobile from './Mobile'
import router from './router';

var width = document.documentElement.clientWidth
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(width > 500 ? App : Mobile)
})
