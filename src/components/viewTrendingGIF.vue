<template>
	<div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <form class="card-content center" autocomplete="off">
            <h2>Trending GIFs</h2>
            <div class="row" v-if="errorStatus">
                <h3>Sorry, there was a problem with the server. ¡Please excuse us!</h3>
            </div>
            <div class="row">
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
    <br>
  </div>
</template>


<script>

    export default {
    	name: 'viewSearchGIF',
      props: [],
      data(){ 
        return {
          errorStatus: false,
          gifs_left: [],
          gifs_right: []
        }
      },
      mounted() {
      },
      computed:{
      },
      watch: {
        
      },
      methods:{
        getTrendingGIFS(){
            this.$http.get('https://api.tenor.com/v1/trending?key=N7HZW5YZJLP3&limit=10')
                .then((response) => {
                    this.addGifsToLists(response.data.results)
                    this.errorStatus = false
                })
                .catch((msg) => {
                    this.errorStatus = true
                });
        },
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
        },
        particularGif(gif){
            this.$emit('seeOneGif', gif);
        }
      },
      created() {
        this.getTrendingGIFS();
        
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
