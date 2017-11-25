import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './components/App.vue'
import router from './utils/router'
import store from './store/store'
import VuePaginate from 'vue-paginate'

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false

//export const SocketInstance = socketio('http://localhost:3000');
//Vue.use(VueSocketIO, SocketInstance)
//Vue.prototype.$socket = socketio('http://localhost:3000/');
Vue.use(VueSocketIO, 'http://localhost:3000/');
Vue.use(VueSocketIO, socketio('http://localhost:3000/'));

//import unirest from 'unirest'

Vue.use(VueRouter);
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //todos los posts son de este formato
Vue.prototype.$http = axios;
//Vue.prototype.$unirest = unirest;
Vue.use(VuePaginate);


new Vue({
	router,
	store,
    el: '#app',
    render: h => h(App)
})