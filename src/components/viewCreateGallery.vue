<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Create gallery</h2>
            <div class="row">
              <div class="col l12">
                
              <input type="text" name="nombre" v-model="name" placeholder="Insert gallery name">
              <button @click.prevent="createGallery">Create</button>

            </div>
          </div>
        </div>
    </div> 
    <br>
  </div>
</template>

<script>
import axios from "axios"
export default {
      name: 'viewUpload',
      props: [],
      data(){ 
        return {
          formData: new FormData(),
          name: ''
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        createGallery() {  
          axios({
            method: 'post',
            url: 'https://api.pixhost.org/galleries',
            data: {
              gallery_name: this.name
            },
            headers: {'content-type': 'application/x-www-form-urlencoded'},
          })
            .then(response => {
              console.log(response.data);
            })
            .catch((response) => {
              console.log(response);
            });
        }
      },
      created() {
      }
    }
</script>

<style>
  
</style>
