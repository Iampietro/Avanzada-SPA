<template>
    <div class="app">
      <top-menu></top-menu>
      <transition name="fade">
        <router-view @seeOneGif="seeOneGif" :particularGif="particularGif"></router-view>
        <router-view @llevameEsta="llevameEsta" :particularGallery="particularGallery"></router-view>
      </transition>
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
              particularGif: {},
              particularGallery: {} 
          }
      },
      methods: {
          seeOneGif(gif){
              this.particularGif = gif;
          },
          llevameEsta(gall){
              this.particularGallery = gall;
          }
      }
    }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>