<template>
  <nav>
    <div class="nav-wrapper negrita">
      <label @click.prevent="logout">Logout</label>
      <label class="brand-logo right">Logo</label>   <!-- esto idealmente sería un boton junto al logo --> 
        <ul class="left hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/upload">Upload image</router-link></li>
          <li><router-link to="/searchGIFs">Search GIFs</router-link></li>
          <li><router-link to="/trendingGIFs">Trending GIFs</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'topMenu',
        data(){
            return {
                
            }
        },
        mounted() {
        },
        created() {
        },
        methods: {
          logout(){
            this.$emit('logout');
          }
        }
    }
</script>

<style>

nav-wrapper: { color: #7572ff }

</style>