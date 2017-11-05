<template>
    <div class="app">
    	<top-menu></top-menu>
      <router-view @seeOneGif="seeOneGif" :particularGif="particularGif">
        
      </router-view>
    </div>
</template>

<script>
	import topMenu from './top-menu.vue';

    export default {
    	name: 'app',
    	components: {
    		topMenu
    	},
      data() {
          return {
              particularGif: {}
          }
      },
      methods: {
          seeOneGif(gif){
              this.particularGif = gif;
          }
      }
    }
</script>

<style scoped>

</style>