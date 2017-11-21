<template>
	<div class="container">
			<div class="center-align">
				<h4 v-if="particularGif.title">{{ particularGif.title }}</h4>
				<h4 v-else>Untitled</h4>
			</div>
			<div class="slider">
				<div class="row center-align">
					<img :src="particularGif.media[0].gif.url" class="responsive-img"> 
				</div>
			</div>
			<button class="btn waves-effect waves-light margin" @click.prevent="Save(particularGif)">
                   Save
            </button>
		<div class="divider"></div>
		<!-- <div class="row">   
			<div class="col s12 l12">
				<p class="center-align">
			        <a @click="prev">Previous</a> || <a @click="next">Next</a>
			    </p>
			    <transition name="fade" tag="p" mode="out-in">
				    	<img :src="suggestions[position].media[0].tinymp4.preview" :key="position" v-if="arrayOk" 																class="suggestion"
																			   @click="change(suggestions[position])">
			    </transition>
			    	 
				
			</div> --> 



			<div v-if="errorStatus" class="row">
				<h3 class="center-align">Sorry, there was a problem with the server ¡Please excuse us!</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'viewParticularGif',
		props: ['particularGif'],
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
	        },
	        Save(gifToSave){
	          const gif = gifToSave.media[0].gif.url;
	          this.$store.commit('saveGif', gif);
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
		},
		mounted() {
			
		}
	}
	
</script>

<style>


	.slider {
	  position: relative;
	  margin-top: 3rem;
	  margin-right: auto;
	  margin-left: auto;
	  overflow: hidden;
	  width: 40.625rem;
	  height: 26.25rem;
	  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

	  .some-marggin{
	  	margin-left: 50%;
	  }

	}

</style>