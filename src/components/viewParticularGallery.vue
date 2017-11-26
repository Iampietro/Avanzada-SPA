<template>
	<div class="container">

		<div class="row">  
			<div class="col s12 m12 l12">
			    <div class="card blue-grey darken-1">
			      	<div class="card-content white-text">
				        <h5>gallery name here hehe</h5>
				        <div class="row">
				          	<div class="col l12">
				            	<div v-for="img in particularGallery" class="costadito">
				              		<img :src="img" class="uploadid img-responsive z-depth-5 center-align">
				            	</div>
				           	</div>
				        </div>
			        </div>
			    </div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'viewParticularGallery',
		props: ['particularGallery'],
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
	        },
	        hasUploadedImages(){
	          return this.userLogged.uploadedImages.length > 0;
	        },
	        images(){
	          if (this.userLogged.uploadedImages.length > 0){
	            const lista = [];

	            for (let i = 0; i < this.userLogged.uploadedImages.length; i++) {
	              lista.push(this.userLogged.uploadedImages);
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