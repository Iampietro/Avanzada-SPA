import VueRouter from 'vue-router'
import viewSearchGIF from '../components/viewSearchGIF.vue'
import viewTrendingGIF from '../components/viewTrendingGIF.vue'
import viewHome from '../components/viewHome.vue'
import viewUpload from '../components/viewUpload.vue'

export default new VueRouter({
  routes: [
	  { path: '/searchGIFs', component: viewSearchGIF },
	  { path: '/trendingGIFs', component: viewTrendingGIF },
	  { path: '/', component: viewHome },
	  { path: '/upload', component: viewUpload }
	]
});