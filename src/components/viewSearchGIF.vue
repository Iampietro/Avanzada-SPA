<template>
  	<div class="container">
        <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
              <form class="card-content" autocomplete="off">
                  <h2>Search for GIFs</h2>
                  <div class="row">
                      <div class="col l12">
                          <div v-if="!gifs">genera uno wachin</div>
                          <div v-else v-for="gif in gifs" class="card gif">
                              <div class="card-image">
                                  <router-link to="/particularGif"> 
                                      <img :src="gif.media[0].gif.url" @click="particularGif(gif)"> 
                                  </router-link> 
                              </div>
                          </div>
                          <input v-model="search" type='text' placeholder="Search for gifs..."/>
                          <button class="btn waves-effect waves-light right" type="submit" name="action" @click.prevent="searchGifs">Search</button>
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
          gifs: [],
          search: ''
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        searchGifs(){
            this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&limit=10&q=' + this.search)
                .then((response) => {
                    this.gifs =  response.data.results
                })
                .catch((msg) => console.log('Error: ', msg));
        },
        particularGif(gif){
            this.$emit('seeOneGif', gif);
        }
      },
      created() {

      }
    }
</script>

<style>

</style>
