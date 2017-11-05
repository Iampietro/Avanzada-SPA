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
			<div class="col s4 l4" v-for="s in suggestions">		 
				<div class="slideshow-container">
					<div class="mySlides fade" v-for="s in suggestions">
					    <img :src="s.media[0].gif.url" style="width:100%">
					</div>
					<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  					<a class="next" onclick="plusSlides(1)">&#10095;</a>
				</div>

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
				suggestions: {}
			}
		},
		methods: {
			getSuggestions() {
				const randomTag = this.tags[Math.floor(Math.random() * this.tags.length)];
				this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&q=' + randomTag.searchterm)
					.then( response => {
						this.suggestions = response.data.results
					})
					.catch( msg => console.log('Error: ', msg));
			},
			showSlides() {
				let i;
				let slideIndex = 0;
				const slides = document.getElementsByClassName("mySlides");
			    for (i = 0; i < slides.length; i++) {
			        slides[i].style.display = "none"; 
			    }
			    slideIndex++;
			    if (slideIndex > slides.length) {slideIndex = 1} 
			    slides[slideIndex-1].style.display = "block"; 
			    setTimeout(showSlides, 2000); // Change image every 2 seconds
			},
			plusSlides(n) {
			  showSlides(slideIndex += n);
			}
		},
		watch: {
			tags: function () {
				this.getSuggestions();
			},
			suggestions: function() {
				this.showSlides();
			}
		},
		created() {
			this.$http.get('https://api.tenor.com/v1/tags?key=N7HZW5YZJLP3')
                .then((response) => {
                    this.tags =  response.data.tags
                })
                .catch((msg) => console.log('Error: ', msg));
		}
	}
	
</script>