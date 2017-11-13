import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './components/App.vue'
import router from './utils/router'
import store from './store/store'
import VuePaginate from 'vue-paginate'


Vue.config.productionTip = false


//import unirest from 'unirest'
//import socketio from 'socket.io-client'
//import VueSocketio from 'vue-socket.io'

//export const SocketInstance = socketio('http://localhost:3000'); 
Vue.use(VueRouter);
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //todos los posts son de este formato
Vue.prototype.$http = axios;
//Vue.prototype.$unirest = unirest;
//Vue.use(VueSocketio, SocketInstance);
//Vue.prototype.$socket = socketio;
Vue.use(VuePaginate);


new Vue({
	router,
	store,
    el: '#app',
    render: h => h(App)
})