<template>
  	<div class="container">
      <div class="row">
        <div class="negrita card blue-grey darken-1">
              <form class="card-content" autocomplete="off">
                  <h2>Search for GIFs</h2>
                  
                    <input v-model="search" type='text' placeholder="Search for gifs..."/>
                    <button 
                      class="btn waves-effect waves-light right" type="submit" name="action" 
                      @click="searchGifs">
                      Search
                    </button>
                    <h3>{{ currentUser.username }}</h3>
                      <h3 v-if="noResults">We're sorry, your search did't have any matches</h3>
                      <div v-else>

                        <div class="col l6">
                            <div v-for="gif in gifs_left" class="card gif">
                                <div class="card-image">
                                    <router-link to="/particularGif"> 
                                        <img class="img-responsive displayed grow" 
                                        :src="gif.media[0].gif.preview" @click="particularGif(gif)"> 
                                    </router-link> 
                                </div>
                            </div>
                        </div>

                        <div class="col l6">
                            <div v-for="gif in gifs_right" class="card gif">
                                <div class="card-image">
                                    <router-link to="/particularGif"> 
                                        <img class="img-responsive displayed grow" 
                                        :src="gif.media[0].gif.preview" @click="particularGif(gif)"> 
                                    </router-link> 
                                </div>
                            </div>
                        </div>

                      </div>
              </form>
        </div>
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
          gifs_left: [],
          gifs_right: [],
          search: '',
          errorStatus: false,
          noResults: false,
          currentUser: {
              username: '',
              password: '',
              savedGifs: [],
              lastSearchs: []
            }
        }
      },
      mounted() {
      },
      computed:{
        
      },
      watch: {
        
      },
      methods:{
        searchGifs(){
            this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&limit=10&q=' + this.search)
                .then((response) => {
                    this.addGifsToLists(response.data.results)
                    this.errorStatus = false
                    this.see = true
                    if (response.data.results.length == 0) {
                        this.noResults = true
                    } else {
                        this.noResults = false
                    }
                })
                .catch((msg) => {
                    this.errorStatus = true
                });
                this.$store.commit('saveSearch', this.search, this.currentUser);
        },
        particularGif(gif){
            this.$emit('seeOneGif', gif);
        },
        //acomodamos los gifs en 2 columnas para mostrarlos 
        addGifsToLists(gifs_response){
          if(gifs_response)
          {
            let lefty = [];
            let righto = [];
            for(let i = 0; gifs_response.length > i; i++) 
            {
              if(i < gifs_response.length / 2)
              {
                lefty.push(gifs_response[i]);
              } else {
                righto.push(gifs_response[i]);
              }
            }

            this.gifs_left = lefty;
            this.gifs_right = righto;
          }
        }
      },
      created() {
        this.currentUser = this.$store.state.justLoggedUser;
      }
    }
</script>

<style>
  .grow:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
