import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './components/App.vue'
import router from './utils/router'
import ProgressiveImage from 'progressive-image/dist/vue'
//import unirest from 'unirest'
//import socketio from 'socket.io-client'
//import VueSocketio from 'vue-socket.io'

//export const SocketInstance = socketio('http://localhost:3000'); 
Vue.use(VueRouter);
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //todos los posts son de este formato
Vue.prototype.$http = axios;
//Vue.prototype.$unirest = unirest;
//Vue.use(VueSocketio, SocketInstance);
//Vue.prototype.$socket = socketio;
Vue.use(ProgressiveImage, {
  removePreview: true
});

new Vue({
	router,
    el: '#app',
    render: h => h(App)
})