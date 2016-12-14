import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles/el-theme/index.css'

Vue.use(ElementUI)

/* eslint-disable */
new Vue({
  el: '#app',
  render: h => h(App)
})
