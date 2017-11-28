<template>
	<div class="container">
		<div v-if="wichGif">	
			<div class="center-align">
				<h4 v-if="wichGif.title">{{ wichGif.title }}</h4>
				<h4 v-else>Untitled</h4>
			</div>
			<div class="alert" v-if="saved">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    Gif Saved successfully!
            </div>
            <div class="alert" v-if="deleted">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    Gif Deleted successfully!
            </div>
			<div class="row center-align">
				<img :src="wichGif.media[0].gif.url" class="responsive-img z-depth-5 displayed particular"> 
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
				<div class="col l6 s12 m12">
					<div class="card blue-grey darken-1">
		          		<div class="card-content white-text">
		          			<div class="row">
								<div class="col s6 m9 l7">
									<input type="text" v-model="coment" placeholder="Write a comment...">
								</div>
								<div class="col s6 m3 l4">
									<button class="waves-effect waves-light btn" @click="addComent(coment)">Comment</button>
								</div>
							</div>
							<div class="row">
								<div class="col s6 m3 l4">
									<button class="waves-effect waves-light btn red" @click="deleteGif(wichGif)">Delete</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="center-align" v-if="hasComents">
					<div class="col s12 m12 l6">
						<div class="mequieroirdeaca">
				        	<div class="card cyan lighten-5" v-for="coment in comentsMade">
				          		<div class="black-text">
									<ul>
										<li >{{ coment }}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		<div v-else>
			<div class="row center-align">
				<img :src="particularImg" class="responsive-img z-depth-5 displayed particular"> 
			</div>
		</div>
	</div>
</template>

<script>
	import io from "socket.io-client";

	import config from "./../config/config";

	export default {
		name: 'viewParticularGif',
		props: ['particularGif', 'particularSavedGif', 'particularImg'],
		data(){
			return {
				saved: null,
				socket: '',
				test: 0,
				coment: '',
				comentsMade: [],
				alreadySaved: false,
				index: null,
				deleted: false
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
			},
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
					return this.comentsMade.length > 0;
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
	        discriminate(){					// gif from...
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
			},
			deleteGif(gifToDelete){
				this.$store.commit('removeGif', gifToDelete);
 		        this.deleted = true;
 		        const that = this;
 		        setTimeout(function(){
 		        	that.$router.push('gallery');
 		        }, 3000);
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
			this.socket = io(config.WS_URL);
		},
		mounted(){
			if (this.particularSavedGif) {
				const name = this.$store.state.justLoggedUser.user.username;
				let images = localStorage.getItem('imagesOf:' + name);
				if (images) {
					images = JSON.parse(images);
					for (var i = images.length - 1; i >= 0; i--) {
						if (images[i].id == this.particularSavedGif.id) {
							this.index = i;
						}
					}
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

	.mequieroirdeaca {
	   padding-left: 10px;
	   padding-right: 10px;
	   border: 10px;
	   width: 100%;
	   height: 300px;
	   overflow-y: scroll;
	}

</style>