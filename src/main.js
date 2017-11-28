import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './components/App.vue'
import router from './utils/router'
import store from './store/store'
import VuePaginate from 'vue-paginate'
import VueCarousel from 'vue-carousel';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';


Vue.config.productionTip = false

Vue.use(VueSocketIO, 'http://localhost:3000/');
Vue.use(VueSocketIO, socketio('http://localhost:3000/'));
Vue.use(VueCarousel);

Vue.use(VueRouter);
Vue.prototype.$http = axios;
Vue.use(VuePaginate);

new Vue({
	router,
	store,
    el: '#app',
    render: h => h(App)
})