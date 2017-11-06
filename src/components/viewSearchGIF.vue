<template>
  	<div class="container">
        <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
              <form class="card-content" autocomplete="off">
                  <h2>Search for GIFs</h2>
                  <div class="row">
                      <div class="col l12">
                          <h3 v-if="noResults">We're sorry, your search did't have any matches</h3>
                          <div v-else v-for="gif in gifs" class="card gif">
                              <div class="card-image">
                                  <router-link to="/particularGif"> 
                                      <img :src="gif.media[0].gif.url" @click="particularGif(gif)"> 
                                  </router-link> 
                              </div>
                          </div>
                          <input v-model="search" type='text' placeholder="Search for gifs..."/>
                          <button class="btn waves-effect waves-light right" type="submit" name="action" @click="searchGifs">Search</button>
                      </div>
                  </div>
              </form>
        </div>
        <div v-if="errorStatus" class="row">
            <h3 class="center-align">Sorry, there was a problem with the server. ¡Please excuse us!</h3>
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
          search: '',
          errorStatus: false,
          noResults: false
        }
      },
      mounted() {
      },
      computed:{
        
      },
      watch: {
        gifs: function() {
            if (this.gifs.length == 0) {
                this.noResults = true;
            }else{
              this.noResults = false;
            }
        }
      },
      methods:{
        searchGifs(){
            this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&limit=10&q=' + this.search)
                .then((response) => {
                    this.gifs =  response.data.results
                    this.errorStatus = false
                })
                .catch((msg) => {
                    this.errorStatus = true
                });
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
