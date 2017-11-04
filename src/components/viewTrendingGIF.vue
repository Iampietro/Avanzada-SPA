<template>
	<div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <form class="card-content" autocomplete="off">
            <h2>Trending GIFs</h2>
            
            <div class="row">
              <div class="col l12">
              <div v-if="!gifs">genera uno wachin</div>
              <div v-else v-for="gif in gifs"> <img :src="gif.media[0].gif.url"> </div>
              </div>
            </div>
        </form>
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
          gifs: []
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        getTrendingGIFS(){
            this.$http.get('https://api.tenor.com/v1/trending?key=N7HZW5YZJLP3&limit=10')
                .then((response) => {
                    this.gifs =  response.data.results
                })
                .catch((msg) => console.log('Error: ', msg));
        }
      },
      created() {
        this.getTrendingGIFS();
      }
    }
</script>

<style>

</style>
