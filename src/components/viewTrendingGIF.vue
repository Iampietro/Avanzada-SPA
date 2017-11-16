<template>
	<div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <form class="card-content" autocomplete="off">
            <h2>Trending GIFs</h2>
            
            <div class="row">
                  <div v-for="gif in gifs" >
                      <img class="img-responsive center-align" :src="gif.media[0].gif.preview">
                  </div>
            </div>
        </form>
    </div> 
    <div class="row" v-if="errorStatus">
        <h3>Sorry, there was a problem with the server. ¡Please excuse us!</h3>
    </div>
    <br>
  </div>
</template>


<script>

    export default {
    	name: 'viewSearchGIF',
      props: [],
      data(){ 
        return {
          gifs: [],
          errorStatus: false
        }
      },
      mounted() {
      },
      computed:{
      },
      watch: {
        authorized: function() {
          this.$router.push('/');
        }
      },
      methods:{
        getTrendingGIFS(){
            this.$http.get('https://api.tenor.com/v1/trending?key=N7HZW5YZJLP3&limit=10')
                .then((response) => {
                    this.gifs =  response.data.results
                    this.errorStatus = false
                })
                .catch((msg) => {
                    this.errorStatus = true
                });
        }
      },
      created() {
        this.getTrendingGIFS();
        
      }
    }
</script>

<style>

</style>
