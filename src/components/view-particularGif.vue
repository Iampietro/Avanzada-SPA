<template>
	<div class="container">
			<div class="center-align">
				<h4 v-if="particularGif.title">{{ particularGif.title }}</h4>
				<h4 v-else>Untitled</h4>
			</div>
			<div class="alert" v-if="saved">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    Gif Saved successfully!
            </div>
			<div class="row center-align">
				<img :src="particularGif.media[0].gif.url" class="responsive-img z-depth-5 displayed"> 
			</div>

			<div class="row center-align">
				<button class="btn waves-effect waves-light" @click.prevent="Save(particularGif)">
                   	<b>Save</b>
            	</button>
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
				saved: null
			}
		},
		computed: {


		},
		methods: {
	        Save(gifToSave){
	          const gif = gifToSave.media[0].gif.url;
	          this.$store.commit('saveGif', gif);
	          this.saved = true;
	        }
		},
		watch: {
			
		},
		created() { 
			
		},
		mounted() {
			
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
<<<<<<< HEAD
	}

	.btn {
		margin: 0px 00px 0px 0px !important;
=======
>>>>>>> 5319a871d5c466ee8d43fe47ef7e6bc32813c9d4
	}

</style>