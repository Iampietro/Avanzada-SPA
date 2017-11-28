<template>
    <div class="app">
      <top-menu></top-menu>
      <transition name="fade">
        <router-view @seeOneGif="seeOneGif" :particularGif="particularGif"
                     @seeSavedGif="seeSavedGif" :particularSavedGif="particularSavedGif"
                     @seeSugestion="seeSugestion"
                     @seeUploadedImg="seeUploadedImg" :particularImg="particularImg">
          
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
              particularGif: null,
              particularSavedGif: null,
              particularImg: null
          }
      },
      methods: {
          seeOneGif(gif){
              this.particularGif = gif;
          },
          seeSavedGif(gif){
              this.particularSavedGif = gif;
          },
          seeUploadedImg(img){
              this.particularImg = img;
          },
          seeSugestion(gif){
            this.particularGif = gif;
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