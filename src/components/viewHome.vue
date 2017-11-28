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

    <div class="row" v-if="hasUploadedImages">  
      <div class="col s4 m4 l12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="row">
              <router-link to="/gallery"> 
                <h5>Your recent uploads</h5>
              </router-link>
              <div v-for="img in uploaded_imgs" class="costadito col m4 l4 s4">
                <img :src="img" class="uploadid img-responsive z-depth-5 center-align">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasGifs"> <!-- saved gifs -->
      <div class="row">
        <div class="col m4 l12 s4">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <div class="row">
                <router-link to="/gallery"> 
                  <h5>Recently saved GIFs</h5>
                </router-link> 
                <div v-for="gif in saved_gifs" class="costadito col m4 l4 s4">
                  <router-link to="/particularGif"> 
                    <img :src="gif.media[0].gif.preview" @click="particularGif(gif)"
                        class="uploadid img-responsive z-depth-5 center-align">
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>        
      <div class="row">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title center">
              You have no saved GIFs to show. Don't be shy, go ahead and save some.
            </span>
          </div>
        </div>
      </div>
    </div>

  <div v-if="hasSearches">
    <div class="row">
      <div class="col s4 m4 l12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="row">
              <h5>Some GIFs you may like...</h5>
              <div v-for="suggestion in suggestionsGifs" class="costadito col m4 l4 s4">
                <router-link to="/particularGif"> 
                  <img :src="suggestion.media[0].gif.preview" @click="suggestionGif(suggestion)" 
                    class="uploadid img-responsive z-depth-5 center-align">
                </router-link>
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
          suggestionsGifs: [],
          uploaded_imgs: [],
          saved_gifs: []
        }
      },
      mounted(){
        this.bringSuggestionsGifs();
        this.gifs();
        this.images();
      },
      created() {
        
      },
      methods: {
        bringSuggestionsGifs(){
          if(this.hasSearches)
          {
            let i_search = 0;
            let super_iterator = 0;
            while(super_iterator < 3)
            {
              if(i_search >= this.searches.length){
                i_search = 0;  
              }
              
              this.$http.get('https://api.tenor.com/v1/search?key=N7HZW5YZJLP3&limit=40&q=' 
                + this.searches[i_search])
                  .then((response) => {
                    let index = Math.floor(Math.random() * 39);
                    let suggestion_gif = {};
                    suggestion_gif = response.data.results[index];
                    this.suggestionsGifs.push(suggestion_gif);
                  })
                  .catch((msg) => {
                    console.log(msg)
              });
              super_iterator++;
              i_search++;
            }
          }
        },
        maneje_de_gifs(sugg_gif){
          this.suggestionsGifs.push(sugg_gif);
        },
        particularGif(gif){
            this.$emit('seeSavedGif', gif);
        },
        suggestionGif(gif){
            this.$emit('seeSugestion', gif);
        },
        bringLast3(list){
          let lista_nueva = [];

          for (let i = 0; i < list.length; i++) {
            lista_nueva.push(list[i]);
          }

          if (lista_nueva.length < 4) {
            return lista_nueva.reverse();
          }else {
            return lista_nueva.slice(-3).reverse();
          }
        },
        gifs(){
          if (this.userLogged.savedGifs.length > 0){
            this.saved_gifs = this.bringLast3(this.userLogged.savedGifs);
          }
        },
        images(){
          if (this.userLogged.uploadedImages.length > 0){
            this.uploaded_imgs = this.bringLast3(this.userLogged.uploadedImages);
          }
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
        hasUploadedImages(){
          return this.userLogged.uploadedImages.length > 0;
        }
      }
    }
</script>

<style>

.uploadid {
  max-width: 280px;
  height: auto;
  margin-right: 9px;
  margin-left: 9px;
  vertical-align: middle;
}

.costadito {
  display: inline;
}

.bkc{
  background-color: cyan lighten-5;
}

</style>