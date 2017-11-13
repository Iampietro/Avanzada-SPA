import VueRouter from 'vue-router'
import viewSearchGIF from '../components/viewSearchGIF.vue'
import viewTrendingGIF from '../components/viewTrendingGIF.vue'
import viewHome from '../components/viewHome.vue'
import viewUpload from '../components/viewUpload.vue'
import viewParticularGif from '../components/view-particularGif.vue'
import viewLogin from '../components/view-Login.vue'
import viewCreateGallery from '../components/viewCreateGallery.vue'

export default new VueRouter({
  routes: [
	  { path: '/searchGIFs', component: viewSearchGIF },
	  { path: '/trendingGIFs', component: viewTrendingGIF },
	  { path: '/', component: viewLogin },
	  { path: '/upload', component: viewUpload },
	  { path: '/particularGif',component: viewParticularGif},
	  { path: '/createGallery', component: viewCreateGallery }
	]

});
