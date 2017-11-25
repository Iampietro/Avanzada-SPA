<template>
  	<div class="container">
        <div class="card blue-grey darken-1">
              <form class="card-content" autocomplete="off">
                  <h2>Search for GIFs</h2><br>
                  <div class="row">
                  <div class="col l12 m12 s12">
                    
                      <input v-model="search" type='text' placeholder="Search for gifs..."/>
                      <button 
                        class="btn waves-effect waves-light right" type="submit" name="action" 
                        @click="searchGifs">
                        Search
                      </button>
                  </div>
                  </div>
                    <h3>{{ currentUser.username }}</h3>
                      <h3 v-if="noResults">We're sorry, your search did't have any matches</h3>
                      <div v-else>
                        <div class="row">
                        <div class="col l6 m8 s12">
                            <div v-for="gif in gifs_left">
                                <div class="center-align padsito">
                                    <router-link to="/particularGif"> 
                                        <img class="img-responsive rescatame z-depth-5 buscada" 
                                        :src="gif.media[0].gif.preview" @click="particularGif(gif)"> 
                                    </router-link> 
                                </div>
                            </div>
                        </div>

                        <div class="col l6 m8 s12">
                            <div v-for="gif in gifs_right">
                                <div class="center-align padsito">
                                    <router-link to="/particularGif"> 
                                        <img class="img-responsive rescatame z-depth-5" 
                                        :src="gif.media[0].gif.preview" @click="particularGif(gif)"> 
                                    </router-link> 
                                </div>
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
          searchingProcess: false,
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
                    this.searchingProcess = true
                    this.addGifsToLists(response.data.results)
                    this.errorStatus = false
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

  img .buscada:hover {
    filter:hue-rotate(90deg);
    filter:drop-shadow(0px 0px 10px #d3e4ff);
  }

  .rescatame {
    max-width: 400px; 
    max-height: 400px;
  }

  button {
    padding-bottom: 15px;
  }

  .padsito {
    padding-bottom: 15px;
  }

</style>
