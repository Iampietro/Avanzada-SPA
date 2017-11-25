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
      <div class="col s12 m12 l12">
        <div v-if="hasGifs">
          <h5>Recently saved GIFs</h5>
            <div v-for="gif in gifs">
              <img :src="gif">
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

<!--
    <div class="row">
      <div class="col s4 m4 l4" v-if="hasSearches">
        <h6>Your last searches: </h6>                    no offense matias
        <p v-for="search in searches">{{ search }}</p>
      </div>
    </div>
-->
    <div class="row">  
      <div class="col s12 m12 l12" v-if="hasUploadedImages">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5>Your recent uploads</h5>
            <div class="row">
              <div class="col l12">
                <div v-for="img in images">
                  <img :src="img" class="uploadid">
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

  img .uploadid {
    max-width: 250px;
    height: auto;
  }

</style>