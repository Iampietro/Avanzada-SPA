<template>
  <nav>
    <div class="nav-wrapper negrita">
      <label class="brand-logo right">La Pro-aborto App</label>
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
        }
    }
</script>

<style>

nav-wrapper: { color: #7572ff }

</style>