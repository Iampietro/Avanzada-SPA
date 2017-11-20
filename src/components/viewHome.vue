<template>
	<div class="negrita container">
    <h3>Welcome {{ userLogged.user.username }}</h3>
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
        userLogged() {
          return this.$store.state.justLoggedUser;
        }
      }
    }
</script>

<style>

</style>