//main.js:인스턴스를 생성하고 index.html 파일과 연결해준다
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router.js'
import store from './store/index.js'

import './assets/common.css'
import axios from 'axios';
//import {createAxios, AxiosContent } from '@vue/axios';

Vue.config.productionTip = false

//인스턴스 생성 : app이라는 id를 가진 태그에 해당 인스턴스를 적용하겠다
new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app');

Vue.prototype.$axios = axios;                 //전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음
Vue.prototype.$serverUrl = '//localhost:8081' //api server

/*
const axios = createAxios({
  serverUrl : '//localhost:8080'
});

Vue.provide(AxiosContent, axios);
*/