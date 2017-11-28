<template>
	<div class="container">
		<div class="row">
			<div class="col s12 m12 l12">
				<div class="row center">
					<h2>{{ usuarioCorrespondiente.username }}'s Gallery</h2>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s4 m4 l4" v-for="img in images">
				<img :src="img.media[0].gif.url">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			usuarioCorrespondiente(){
				return this.$store.state.toShowGallery;
			},
			images(){
				return this.usuarioCorrespondiente.savedGifs;
			}
		}
	}
</script>