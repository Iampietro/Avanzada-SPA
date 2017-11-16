<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Upload</h2>
            <div class="row">
              <div class="col l12">

                <div id="app">
                  <div v-if="!image">
                    <h2>Select an image</h2>
                    <input type="file" @change="onFileChange">
                  </div>
                  <div v-else>
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                  </div>
                </div>

                <button class="btn waves-effect waves-light right" @click="upload_image">Upload</button>

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
          pikir: {
            body: '',
          },
          isLoading: false,
          image: '',
          image_name: ''
        }
      },
      mounted() {
      },
      computed:{
      },
      watch: {
        authorized: function() {
          this.$router.push('/');
        }
      },
      methods:{
        onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          this.image_name = files;
          if (!files.length)
            return;
          this.createImage(files[0]);
        },
        createImage(file) {
          var image = new Image();
          var reader = new FileReader();

          reader.onload = (e) => {
            this.image = e.target.result;
            console.log(e.target.result);
          };
          reader.readAsDataURL(file);
        },
        removeImage: function (e) {
          this.image = '';
        },
        upload_image(){
          axios({
            method: 'post',
            url: 'https://api.pixhost.org/images',
            data: {
              img: this.image,
              content_type: '0'
            },
            headers: { 'content_type': 'multipart/form-data' },
          })
            .then(response => {
              console.log(response.data);
            })
            .catch((response) => {
              console.log(response);
            });
        }

            //this.message = true;
            //setTimeout(this.message_false, 4000);
        
      },
      created() {
      }
    }
</script>

<style>

</style>