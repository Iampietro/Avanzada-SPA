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

    <div class="row">
      <div class="col s4 m4 l4">
        <div v-if="hasGifs">
          <h6>Your last saved Gifs <i>(Fijate si podes hacer un carrusel o algo mas bonito acá Coop)</i></h6>
            <div v-for="gif in gifs">
              <img :src="gif">
            </div>
        </div>
        <div v-else class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">It seems that you haven't saved any Gif!</span>
            <p>You heard that? There's a laugh waiting for you in the corner</p>
          </div>
          <div class="card-action">
            <router-link to="/searchGIFs">
              <a href="#">Click me!</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s4 m4 l4" v-if="hasSearches">
        <h6>Your last searches: </h6>
        <p v-for="search in searches">{{ search }}</p>
      </div>
      <div class="col s8 m8 l8" v-if="hasUploadedImages">
        <h6>Uploaded images:</h6>
        <div v-for="img in images">
          <img :src="img">
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
        }
      },
      mounted() {
      },
      created() {
      },
      methods: {
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
          return this.userLogged.uploadedImages;
        }
      }
    }
</script>

<style>

</style>