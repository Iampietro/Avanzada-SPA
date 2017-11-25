import VueRouter from 'vue-router'
import viewSearchGIF from '../components/viewSearchGIF.vue'
import viewTrendingGIF from '../components/viewTrendingGIF.vue'
import viewHome from '../components/viewHome.vue'
import viewUpload from '../components/viewUpload.vue'
import viewParticularGif from '../components/view-particularGif.vue'
import viewLogin from '../components/view-Login.vue'
import viewCreateGallery from '../components/viewCreateGallery.vue'
import viewGallery from '../components/viewGallery.vue'

import store from '../store/store'

export default new VueRouter({
  routes: [
	  { 
	  	path: '/searchGIFs', 
	  	component: viewSearchGIF,
	  	beforeEnter: (to, from, next) => {
	  		if (store.state.authorized)
	  			next();
	  		else
	  			next('/');
	  	}
	  },
	  { 
	  	path: '/trendingGIFs', 
	  	component: viewTrendingGIF,
	  	beforeEnter: (to, from, next) => {
	  		if (store.state.authorized)
	  			next();
	  		else
	  			next('/');
	  	}
	  },
	  { 
	  	path: '/', 
	  	component: viewLogin 
	  },
	  { 
	  	path: '/upload', 
	  	component: viewUpload,
	  	beforeEnter: (to, from, next) => {
	  		if (store.state.authorized)
	  			next();
	  		else
	  			next('/');
	  	} 
	  },
	  { 
	  	path: '/particularGif',
	  	component: viewParticularGif,
	  	beforeEnter: (to, from, next) => {
	  		if (store.state.authorized)
	  			next();
	  		else
	  			next('/');
	  	}
	  },
	  { 
	  	path: '/createGallery', 
	  	component: viewCreateGallery,
	  	beforeEnter: (to, from, next) => {
	  		if (store.state.authorized)
	  			next();
	  		else
	  			next('/');
	  	} 
	  },
	  {
	  	path: '/home',
	  	component: viewHome,
	  	beforeEnter: (to, from, next) => {
	  		if(store.state.authorized)
	  			next();
	  		else
	  			next('/')
	  	}
	  },
	  {
	  	path: '/gallery',
	  	component: viewGallery,
	  	beforeEnter: (to, from, next) => {
	  		if(store.state.authorized)
	  			next();
	  		else
	  			next('/')
	  	}
	  }
	]

});
