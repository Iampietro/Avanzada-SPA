<template>
  <div class="container">
    <div class="row">
      <div class="col s2 m2 l2 right">
        <div class="chip">
          <strong class="black-text">{{ userLogged.username }}</strong>
          <i class="small material-icons right">account_circle</i>
        </div>
      </div>
    </div>

    <h1>concha {{suggestionsGifs}}</h1>

    <div class="row">
      <div class="col s12 m12 l12">
        <div v-if="hasGifs">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <h5>Recently saved GIFs</h5>
              <div class="row">
                <div class="col l12">
                <tr>
                  <div v-for="gif in gifs" class="costadito">
                    <td><router-link to="/particularGif"> 
                      <img :src="gif.media[0].gif.preview" @click="particularGif(gif)"
                        class="uploadid img-responsive z-depth-5 center-align">
                    </router-link></td>
                  </div>
                </tr>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
              <router-link to="/searchGIFs">
              <a href="#">
                <b>It seems that you haven't saved any GIF!</b>
                <p>You heard that? There's a laugh waiting for you in the corner</p>
              </a>
              </router-link>
          </div>
        </div>
      </div>
    </div>

  <div v-if="hasSearches">
    <div class="row">
      <div class="">
      <h5>Some GIFs you may like...</h5>
        <div v-for="suggestion in suggestionsGifs">
          <router-link to="/particularGif"> 
            <img :src="suggestion.media[0].gif.preview" @click="particularGif(suggestion)">
          </router-link>
        </div>
      </div>
    </div>
  </div>

    <div class="row">  
      <div class="col s12 m12 l12" v-if="hasUploadedImages">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5>Your recent uploads</h5>
            <div class="row">
              <div class="col l12">
                <div v-for="img in images" class="costadito">
                  <img :src="img" class="uploadid img-responsive z-depth-5 center-align">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'viewHome',
      components:{
      }, 
      data(){ 
        return {
          suggestionsGifs: []
        }
      },
      mounted(){
        //this.bringSuggestionsGifs();
      },
      created() {
        
      },
      methods: {
        bringSuggestionsGifs(){
          if(this.hasSearches)
          {
            let i_search = 0;
            //while(this.suggestionsGifs.length < 5)
            //{
              if(i_search >= this.searches.length){
                i_search = 0;  
              }
              
              this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&limit=2&q=' 
                + this.searches[i_search])
                  .then((response) => {
                    debugger;
                    let index = Math.floor(Math.random() * 1);
                    const suggestion_gif = {};
                    suggestion_gif.preview = response.data.results[index].media[0].gif.preview;
                    suggestion_gif.gif = response.data.results[index].media[0].gif.url;
                    this.suggestionsGifs.push(suggestion_gif);
                  })
                  .catch((msg) => {
                    console.log(msg)
              });

              i_search++;
            //}
          }
        },
        maneje_de_gifs(sugg_gif){
          this.suggestionsGifs.push(sugg_gif);
        },
        particularGif(gif){
            this.$emit('seeOneGif', gif);
        }
      },
      computed: {
        userLogged(){
          return this.$store.state.justLoggedUser.user;
        },
        hasSearches(){
          return this.userLogged.lastSearchs.length > 0;
        },
        searches(){
          return this.userLogged.lastSearchs;
        },
        hasGifs(){
          return this.userLogged.savedGifs.length > 0;
        },
        gifs(){
          const lastGifs = this.userLogged.savedGifs;
          if (lastGifs.length < 6) {
            return lastGifs;
          }else {
            return lastGifs.slice(-5);
          }
        },
        hasUploadedImages(){
          return this.userLogged.uploadedImages.length > 0;
        },
        images(){
          if (this.userLogged.uploadedImages.length > 0){
            const lista = [];

            for (let i = 0; i < this.userLogged.uploadedImages.length; i++) {
              lista.push(this.userLogged.uploadedImages[i]);
            }

            lista.reverse();

            if (lista.length < 4) {
              return lista;
            }else {
              return lista.slice(-3);
            }
          }
        }
      }
    }
</script>

<style>

.uploadid {
  max-width: 280px;
  height: auto;
  margin-right: 8px;
  margin-left: 8px;
  vertical-align: middle;
}

.costadito {
  display: inline;
}

table, th, td {
   border: 1px solid black;
}

</style>