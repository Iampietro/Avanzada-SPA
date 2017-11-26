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
				        	<router-link to="/particularGallery">
				        	<h5>Your uploads</h5 @click="particularGallery(this.userLogged.uploadedImages)">
				        	</router-link>
				        	<div class="row">
				          		<div class="col l12">
				            		<div v-for="img in images" class="costadito">
				              			<img :src="img" class="uploadid img-responsive z-depth-5 center-align">
				            		</div>
				           		</div>
				         	</div>
			         	</div>
			         	<div v-else>
			         		<span class="card-title center">
			         			This is where my images and GIFs would be...IF I HAD SOME !!
			         		</span>
			         	</div>
			        </div>
			       </div>
			   </div>
		</div>

		<div class="row">
	      <div class="col s12 m12 l12">
	        <div v-if="hasGifs">
	          <div class="card blue-grey darken-1">
	            <div class="card-content white-text">
	              <h5>Recently saved GIFs</h5>
	              <div class="row">
	                <div class="col l12">
	                  <div v-for="gif in gifs" class="costadito">
	                    <router-link to="/particularGif"> 
	                      <img :src="gif.media[0].gif.preview" @click="particularGif(gif)"
	                        class="uploadid img-responsive z-depth-5 center-align">
	                    </router-link>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
		    <div v-else class="card blue-grey darken-1">
			  <div class="card-content white-text">
				<span class="card-title center">
					There's nothing to show. Don't be shy! Go ahead and save some gifs.
				</span>
			  </div>
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
			},
			particularGallery(gall){
				this.$emit('llevameEsta', gall);
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
	        },
	        hasUploadedImages(){
	          return this.userLogged.uploadedImages.length > 0;
	        },
	        images(){
	          if (this.userLogged.uploadedImages.length > 0){
	            const lista = [];

	            for (let i = 0; i < this.userLogged.uploadedImages.length; i++) {
	              lista.push(this.userLogged.uploadedImages[i]);
	            }

	            lista.reverse();

	            if (lista.length < 4) {
	              return lista;
	            }else {
	              return lista.slice(-3);
	            }
	          }
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

.costadito {
  display: inline;
}
</style>