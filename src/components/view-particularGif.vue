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

			<div class="row center-align" v-if="hasComents">
				<ul>
					<li v-for="coment in comentsMade">{{ coment }}</li>
				</ul>
			</div>

			<div class="row center-align" v-if="notFromGallery">
				<button class="btn waves-effect waves-light" @click.prevent="Save(wichGif)">
                   	<b>Save</b>
            	</button>
            	<label v-if="alreadySaved" class="light-green-text text-darken-3">
                   	<strong>You have already saved this gif!</strong>
                </label>
			</div>

			<div class="row center-align" v-else>
				<div class="col s5 m5 l5">
					<input type="text" v-model="coment" placeholder="Say what you think!">
					
					<button class="waves-effect waves-light btn" @click="addComent(coment)">
						Coment
					</button>
				</div>
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
		props: ['particularGif', 'particularSavedGif', 'index'],
		data(){
			return {
				saved: null,
				socket: '',
				test: 0,
				coment: null,
				comentsMade: [],
				alreadySaved: false
			}
		},
		computed: {
			fromTrending(){
				return this.$store.state.gifFromTrending;
			},
			fromGallery(){
				return this.$store.state.gifFromGallery;
			},
			wichGif(){
				return this.discriminate();
			},
			notFromGallery(){
				return this.check();
			},
			hasComents(){
				return this.verifyComents();
			}
			/*coments(){
				return this.giveMeComents();
			}*/
		},
		methods: {
			saveIt(gifToSave){
				gifToSave.coments = [];
		        this.$store.commit('saveGif', gifToSave);
		        this.saved = true;
			},
			verifyComents(){
				if (this.particularSavedGif) {
					return this.particularSavedGif.coments.length > 0;
				} else {
					return false;
				}
			},
			giveMeComents(){
				if (this.particularSavedGif) {
					return this.particularSavedGif.coments;
				}
			},
			check(){
				if (this.particularGif || this.fromTrending){
					return true;
				} else {
					return false;
				}
				 
			},
	        Save(gifToSave){
	        	debugger
	          const gifGuardados = this.$store.state.justLoggedUser.user.savedGifs;
	          if (gifGuardados) {
	          	for (var i = 0; i < gifGuardados.length; i++){
	          		if (gifGuardados[i].id == gifToSave.id)
	          			this.alreadySaved = true;
	          	}
	          	if (this.alreadySaved == false) 
	          		this.saveIt(gifToSave);
	          } else 
	          		this.saveIt(gifToSave);
	        },
	        increment(test){
	          this.socket.emit('increment', test);
	        },
	        discriminate(){					// gif from where
				if (this.particularGif) {
					return this.particularGif;
				} else if (this.fromTrending) {
					return this.fromTrending;
				} else if (this.particularSavedGif) {
					return this.particularSavedGif;
				} 
			},
			addComent(coment){
				
				const fuckingArray = [];
				const gif = this.wichGif;
				const where = "savedGifs";

				fuckingArray.push(gif);
				fuckingArray.push(coment);
				fuckingArray.push(where);

				this.$store.commit('addComent', fuckingArray);

 	          	this.socket.emit('comentMade', coment);

			}
		},
		watch: {

			
		},
		beforeDestroy(){
			if (this.particularGif) {
				this.$emit('seeOneGif', '');
			} else if (this.particularSavedGif) {
				this.$emit('seeSavedGif', null);
			} else {
				this.$store.commit('cleanGifs');
			}

		},
		created(){
			this.socket = io("http://localhost:3000");
		},
		mounted(){
			const name = this.$store.state.justLoggedUser.user.username;
			if (this.index != null) {
				let images = localStorage.getItem('images' + name);
				if (images) {
					images = JSON.parse(images);
					this.comentsMade = images[this.index].coments;
				}
			}
			
		},
		sockets:{
			increment(newValue){
				this.test = newValue;
			},
			comentMade(coment){
				this.comentsMade = this.giveMeComents();
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