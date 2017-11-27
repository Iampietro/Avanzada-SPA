<template>
	<div class="container">
		<div class="row">
			<div class="col s12 m12 l12">
				<div class="row center">
					<h2>{{ userLogged.username }}'s Gallery</h2>
				</div>
			</div>
		</div>

		<div class="row">  
			<div class="col s12 m12 l12">
			    <div class="card blue-grey darken-1">
			      	<div class="card-content white-text">
			      		<div v-if="hasUploadedImages">
				        	<h5>Your uploads</h5>
				        	<carousel>
				          		<slide v-for="img in images">
				            		<div class="center-align">
				              			<img :src="img" class="saved img-responsive z-depth-5">
				            		</div>
				           		</slide>
				         	</carousel>
			         	</div>
			         	<div v-else>
			         		<span class="card-title center">
			         			<router-link to="/upload">
			         				<a href="#">This is where my uploads would be...IF I HAD SOME !!</a>
			         			</router-link>
			         		</span>
			         	</div>
			        </div>
			       </div>
			   </div>
		</div>

		<div class="row">
	    	<div class="col s12 m12 l12">
	    		<div class="card blue-grey darken-1">
            		<div class="card-content white-text" v-if="hasGifs">
	    			<h5>Saved GIFs</h5>
					<carousel>
					    <slide v-for="(gif, index) in gifs">
					    	<div class="center-align">
					    	<router-link to="/particularGif"> 
					    	<img :src="gif.media[0].gif.preview" @click="seeThisGif(gif, index)"
						                        class="saved img-responsive z-depth-5">
						    </router-link>
						    </div>
					    </slide>
					</carousel>
					</div>
					<div v-else class="card-content white-text">
						<span class="card-title center">
			         			You don't have any saved GIFs man, save some so you can save them
			         	</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

	export default {
		name: 'viewGallery',
		data() {
			return {

			}
		},
		components: {
		   	Carousel,
		   	Slide
		},
		methods: {
			seeThisGif(gif, index){
				//this.$store.commit('galleryGif', gif);
				this.$emit('seeSavedGif', gif, index);
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
	          return this.userLogged.savedGifs.reverse();
	        },
	        hasUploadedImages(){
	          return this.userLogged.uploadedImages.length > 0;
	        },
	        images(){
	          return this.userLogged.uploadedImages.reverse();
	        }
		}
	}
</script>

<style>
.uploadid {
  max-width: 280px;
  height: auto;
  margin-right: 8px;
  margin-left: 8px;
  vertical-align: middle;
}

.saved {
  max-width: 390px;
  height: auto;
  vertical-align: middle;
}

.costadito {
  display: inline;
}
</style>