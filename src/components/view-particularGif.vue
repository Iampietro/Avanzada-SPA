<template>
	<div class="container">
		<div class="row center-align">
			<h4 v-if="particularGif.title">{{ particularGif.title }}</h4>
			<h4 v-else>Untitled</h4>
			<div class="center-align">
                <img :src="particularGif.media[0].gif.url" class="responsive-img"> 
			</div>
		</div>
		<div class="divider"></div>
		<div class="row">
			<div class="col s4 l4">
				<p>
			        <a @click="prev">Previous</a> || <a @click="next">Next</a>
			    </p>		 
				<img :src="suggestions[position].media[0].gif.url" v-if="arrayOk">
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
				this.timer = setInterval(this.next, 3000);
			},
			stopRotation() {
	            clearTimeout(this.timer);
	            this.timer = null;
        	},
        	next() {
        		this.currentNumber += 1;
        	},
        	prev() {
	            this.currentNumber -= 1
	        }
		},
		watch: {
			tags: function () {
				this.getSuggestions();
			},
			suggestions: function() {
				
			}
		},
		created() {
			this.$http.get('https://api.tenor.com/v1/tags?key=N7HZW5YZJLP3')
                .then((response) => {
                    this.tags =  response.data.tags
                })
                .catch((msg) => console.log('Error: ', msg));
		},
		mounted() {
			this.startRotation();
		}
	}
	
</script>