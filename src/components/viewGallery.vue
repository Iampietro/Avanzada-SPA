<template>
	<div class="container">
		<div class="row">
			<div class="col s12 m12 l12">
				<div class="row center">
					<h2>Your Gallery</h2>
				</div>
			</div>
			<div v-if="hasGifs">
	          	<h6>Your last saved Gifs <i>(Fijate si podes hacer un carrusel o algo mas bonito acá Coop)</i></h6>
	            <div v-for="gif in gifs">
	              	<router-link to="/particularGif">
	              		<img :src="gif" @click="seeThisGif(gif)">
	              	</router-link>
	            </div>
	        </div>
	        <div v-else class="card blue-grey darken-1">
			          <div class="card-content white-text">
			            	<span class="card-title center">There's nothing to show. Don't be shy! Go ahead and save some gifs.</span>
			          </div>
	        </div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'viewGallery',
		data() {
			return {

			}
		},
		methods: {
			seeThisGif(gif){
				this.$store.commit('galleryGif', gif);
			}
		},
		computed: {
			userLogged(){
	          return this.$store.state.justLoggedUser.user;
	        },
	        hasGifs(){
	          return this.userLogged.savedGifs.length > 0;
	        },
	        gifs(){
	          return this.userLogged.savedGifs;
	        }
		}
	}
</script>