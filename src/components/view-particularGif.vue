<template>
	<div class="container">
		<div class="row center-align">
			<div class="col s12 m12 l12">
				<h4 v-if="particularGif.title">{{ particularGif.title }}</h4>
				<h4 v-else>Untitled</h4>
			</div>
			<div class="col s9 m9 l9 offset-l3">
				<div>
	                <img :src="particularGif.media[0].gif.url" class="responsive-img"> 
				</div>
			</div>
		</div>
		<div class="divider"></div>
		<div class="row">
			<div class="col s12 l12">
				<p class="center-align">
			        <a @click="prev">Previous</a> || <a @click="next">Next</a>
			    </p>
			    <transition name="fade" tag="p" mode="">
				    	<img :src="suggestions[position].media[0].tinymp4.preview" :key="position" v-if="arrayOk" 																class="suggestion"
																			   @click="change(suggestions[position])">
			    </transition>
			    	 
				
			</div>
			<div v-if="errorStatus" class="row">
				<h3 class="center-align">Sorry, there was a problem with the server ¡Please excuse us!</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'viewParticularGif',
		props: ['particularGif', 'authorized'],
		data(){
			return {
				tags: {},
				suggestions: {},
				currentNumber: 0,
				timer: null,
				errorStatus: null
			}
		},
		computed: {
			arrayOk() {
				return this.suggestions.length;
			},
			position() {
				return Math.abs(this.currentNumber) % this.suggestions.length
			}

		},
		methods: {
			getSuggestions() {
				const randomTag = this.tags[Math.floor(Math.random() * this.tags.length)];
				this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&q=' + randomTag.searchterm + 			'&limit=10')
					.then( response => {
						this.suggestions = response.data.results
						this.errorStatus = false
					})
					.catch( msg => {
						this.errorStatus = true
					});
			},
			startRotation() {
				this.timer = setInterval(this.next, 5000);
			},
			stopRotation() {
	            clearTimeout(this.timer);
	            this.timer = null;
        	},
        	next() {
        		this.currentNumber += 1;
	        },
        	prev() {
	            this.currentNumber -= 1;
	        },
	        change(gifToChange) {
	        	this.$emit('seeOneGif', gifToChange);
	        }
		},
		watch: {
			tags: function () {
				this.getSuggestions();
			},
			suggestions: function() {
				this.startRotation();
			}
		},
		created() { // Podriamos guardar esto en vuex (y quizas las sugerencias tmb)
			this.$http.get('https://api.tenor.com/v1/tags?key=N7HZW5YZJLP3')
                .then((response) => {
                    this.tags =  response.data.tags
                    this.errorStatus = false
                })
                .catch((msg) => {
                	this.errorStatus = true
                });
            if (!this.authorized) {
	          this.$router.push('/');
	        }
		},
		mounted() {
			
		}
	}
	
</script>

<style>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}
</style>