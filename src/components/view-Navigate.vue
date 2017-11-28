<template>
	<div class="container">
		<div class="row center-align">
			<div class="col s12 m12 l12">
				<h3>Explore people's saved gifs!</h3>
			</div>
			<div class="col s12 m12 l12">
				<div class="row">
					<div class="col s4 m4 l4" v-for="user in users">
						<h5>{{ user.username }}'s Gallery</h5>
						<router-link to="/particularGif"> 
							<img :src="user.savedGifs[0].media[0].gif.preview" class="z-depth-5">
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'viewNAvigate',
		data() {
			return {
				
			}
		},
		computed:{
			usuarios(){
				return this.$store.state.users;
			},
			users(){
				return this.withSavedGifs();
			}
		},
		methods:{
			withSavedGifs(){
				debugger
				this.$store.commit('check');
				const hasGifs = [];
				for (var i = this.usuarios.length - 1; i >= 0; i--) {
					if (this.usuarios[i].user.savedGifs.length > 0) {
						hasGifs.push(this.usuarios[i].user);
					}
				}
				return hasGifs;
			}
		}
	}
</script>

<style>
	h5 {
		color: #263238;
	}
</style>