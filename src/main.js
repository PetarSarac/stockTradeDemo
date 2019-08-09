import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import store from './store/store.js'
import VueResource from 'vue-resource'
import ElementUi from 'element-ui'


Vue.use(ElementUi);
Vue.use(VueRouter);
Vue.use(VueResource);


Vue.http.options.root = 'https://vue-petar.firebaseio.com/';

Vue.filter('currency',(value)=>{
return '$' + value.toLocaleString();
});



const router = new VueRouter({
mode:'history',
routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

