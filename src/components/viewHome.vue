<template>
	<div class="container">
    <div class="row">
      <h5 class="right"><i> Logged as: {{ userLogged.user.username }}</i></h5>
    </div>
    <div class="row" v-if="haveSearches">
      <h6>Your last searches: </h6>
      <p v-for="search in userLogged.user.lastSearchs">{{ search }}</p>
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
        //this.getAllNews();
      },
      created() {
        //this.getAllNews();
      },
      methods: {
      },
      computed: {
        userLogged(){
          return this.$store.state.justLoggedUser;
        },
        haveSearches(){
          return this.userLogged.user.lastSearchs.length > 0;
        }
      }
    }
</script>

<style>

</style>