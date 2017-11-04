<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <form class="card-content" autocomplete="off">
            <h2>Upload</h2>
            <!--<input v-model="news.body" type="text" placeholder="Insert body">-->
            <div class="row">
              <div class="col l12">
              <form>
              <!--<input v-model="selected_image" type="file" accept="image/jpeg, image/png, image/gif" multiple/>
              <input v-model="search" type='text' placeholder="Search for gifs..."/>
              <button class="btn waves-effect waves-light right" type="submit" name="action" @click.prevent="upload_image">Search</button>-->


                <div v-if="!image">
                  <h2>Select an image</h2>
                  <input type="file" @change="on_file_change" class="btn waves-effect waves-light right">
                </div>
                <div v-else>
                  <img :src="image" />
                  <button class="btn waves-effect waves-light right" @click="remove_image">Remove image</button>
                </div>

                <button class="btn waves-effect waves-light right" @click="upload_image">Upload</button>

              </form>
              </div>
            </div>
        </form>
    </div> 
    <br>
  </div>
</template>

<script>

    export default {
      name: 'viewUpload',
      props: [],
      data(){ 
        return {
          image: '',
          NSFW: ''
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        on_file_change(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.create_image(files[0]);
        },
        create_image(file) {
          let image = new Image();
          let reader = new FileReader();
          let vm = this;

          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
          console.log(this.image);
        },
        remove_image: function (e) {
          this.image = '';
        },
        upload_image(){
          /*const unirest = require('unirest');

          unirest.post('https://api.pixhost.org/images')
            .headers({'Content-Type': 'multipart/form-data'})
            .field('parameter', 'value') // Form field 
            .attach('file', '/tmp/file') // Attachment 
            .end(function (response) {
              console.log(response.body);
          });*/

/*
          this.$http.post('https://api.pixhost.org/images&img=' + this.image + '&content_type=0').then((response) => {
              console.log("se pudoo");
              console.log(response.status)
            })
            .catch((error) => {
             console.log(error);
           })*/
            //this.message = true;
            //setTimeout(this.message_false, 4000);
        }
      },
      created() {

      }
    }
</script>

<style>

</style>
