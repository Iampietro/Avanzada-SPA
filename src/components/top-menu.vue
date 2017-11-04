<template>
  <nav>
    <div class="nav-wrapper negrita">
      <label class="brand-logo right">La Mati Sooper App</label>
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
            //this.getAllCategories();
        },
        created() {
            //this.getAllCategories();
        },
        methods: {
            /*getAllCategories(){
                this.$http.get('http://localhost:8080/categories')
                .then((response) => {
                    this.categories =  response.data._embedded.categories
                })
                .catch((msg) => console.log('Error: ', msg));
            }*/
        }
    }
</script>

<style>

nav-wrapper: { color: #7572ff }

</style>