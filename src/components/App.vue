<template>
    <div class="app">
      <top-menu></top-menu>
      <transition name="fade">
        <router-view @seeOneGif="seeOneGif" :particularGif="particularGif"
                     @seeSavedGif="seeSavedGif" :particularSavedGif="particularSavedGif">
          
        </router-view>
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
              particularSavedGif: {} 
          }
      },
      methods: {
          seeOneGif(gif){
              this.particularGif = gif;
          },
          seeSavedGif(gif){
              this.particularSavedGif = gif;
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