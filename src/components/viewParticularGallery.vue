<template>
	<div class="container">
		<div class="row">  
			<div class="col s12 m12 l12">
			    <div class="card blue-grey darken-1">
			      	<div class="card-content white-text">
				        <h5>gallery name here hehe</h5>
				        <div class="row">
				          	<div class="col l12">
				            	<div v-for="img in images" class="costadito">
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
			
		},
		computed: {
			images(){
				return this.$store.justLoggedUser.user.uploadedImages;
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