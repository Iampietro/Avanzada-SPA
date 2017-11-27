<template>
	<div class="container">
			<div class="center-align">
				<h4 v-if="wichGif.title">{{ wichGif.title }}</h4>
				<h4 v-else>Untitled</h4>
			</div>
			<div class="alert" v-if="saved">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    Gif Saved successfully!
            </div>
			<div class="row center-align">
				<img :src="wichGif.media[0].gif.url" class="responsive-img z-depth-5 displayed"> 
			</div>

			<div class="row center-align">
				<ul id="coments">
					
				</ul>
			</div>

			<div class="row center-align">
				<div class="col s5 m5 l5">
					<input type="text" v-model="coment" placeholder="Say what you think!">
					
					<button class="waves-effect waves-light btn" @click="addComent(coment)">Coment</button>
				</div>
			</div>

			<div class="row center-align" v-if="notFromGallery">
				<button class="btn waves-effect waves-light" @click.prevent="Save(particularGif)">
                   	<b>Save</b>
            	</button>
			</div>
			<div>
				<h1 @click="increment(test)">{{ test }}</h1>
			</div>
	</div>
</template>

<script>
	import io from "socket.io-client";

	export default {
		name: 'viewParticularGif',
		props: ['particularGif', 'particularSavedGif'],
		data(){
			return {
				saved: null,
				socket: '',
				test: 0,
				coment: ''
			}
		},
		computed: {
			fromTrending(){
				return this.$store.state.gifFromTrending;
			},
			wichGif(){
				return this.discriminate();
			},
			notFromGallery(){
				return this.check();
			}
		},
		methods: {
			check(){
				if (this.particularGif || this.fromTrending){
					return true;
				} else {
					return false;
				}
				 
			},
	        Save(gifToSave){
	          this.$store.commit('saveGif', gifToSave);
	          this.saved = true;
	        },
	        increment(test){
	          this.socket.emit('increment', test);
	        },
	        discriminate(){
				if (this.particularGif) {
					return this.particularGif;
				} else if (this.fromTrending != null) {
					return this.fromTrending;
				} else if (this.particularSavedGif) {
					return this.particularSavedGif;
				} else {
					return this.$store.state.gifFromGallery;
				}
			},
			addComent(coment){
				debugger
				const aux = 'savedGifs';
				this.$store.commit('addComent', this.wichGif, coment, aux);
			}
		},
		watch: {
			
		},
		beforeDestroy(){
			if (this.particularGif) {
				this.$emit('seeOneGif', '');
			} else if (this.particularSavedGif) {
				this.$emit('seeSavedGif', '')
			} else {
				this.$store.commit('cleanGifs');
			}

		},
		created() {
			this.socket = io("http://localhost:3000");
		},
		sockets: {
			increment(newValue){
				this.test = newValue;
			}
		}
	}
	
</script>

<style>

	.alert {
    padding: 20px;
    background-color: #66ff66;
    color: black;
    margin-bottom: 15px;
	}

	
	.closebtn {
	    margin-left: 15px;
	    color: black;
	    font-weight: bold;
	    float: right;
	    font-size: 22px;
	    line-height: 20px;
	    cursor: pointer;
	    transition: 0.3s;
	}

	.closebtn:hover {
	    color: white;
	}

	.btn {
		margin: 0px 00px 0px 0px !important;
	}

</style>