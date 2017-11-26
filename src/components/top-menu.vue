<template>
  <nav>
    <div class="nav-wrapper negrita">
      
      <label class="brand-logo right">Imagen Express</label>   <!-- esto idealmente sería un boton junto al logo --> 
        <ul class="left hide-on-med-and-down">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/upload">Upload image</router-link></li>
          <li><router-link to="/searchGIFs">Search GIFs</router-link></li>
          <li><router-link to="/trendingGIFs">Trending GIFs</router-link></li>
          <li><router-link to="/gallery">Gallery</router-link></li>
          <li>
            <a class="" href='#' data-activates='dropdown1'>My Account</a>
              <ul id='dropdown1' class="dropdown-content">
                <li><h6 @click.prevent="logout" class="right"><a href="">Log out</a></h6></li>
              </ul>
          </li>
        </ul>

    </div>
    </nav>
</template>

<script>
    export default {
        name: 'topMenu',
        data(){
            return {
                user: {}
            }
        },
        mounted() {

        },
        created() {

        },
        methods: {
          logout(){
            this.$store.commit('logout');
            this.$router.push('/')
          }
        }
    }
</script>

<style>

h6 {
  padding-right: 250px;
  padding-top: 15px;
  color: #d3e4ff !important;
}

nav-wrapper: { color: #7572ff }

</style>




