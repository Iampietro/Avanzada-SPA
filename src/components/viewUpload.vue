<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Upload</h2>
            <div class="row">
              <div class="col l12">
              <form enctype="multipart/form-data">
                <div id="app">
                  <div >
                    <h2>Select an image</h2>
                    <input type="file" @change="onFileChange($event.target.name, $event.target.files);"
                      accept="image/*">
                  </div>
                  <!--<div >
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                  </div>-->
                </div>

                <!--<button class="btn waves-effect waves-light right" @click.prevent="upload_image">Upload</button>-->
                </form>
            </div>
          </div>
        </div>
    </div> 
    <br>
  </div>
</template>

<script>
import axios from "axios"
import { upload } from './file-upload.service'
export default {
      name: 'viewUpload',
      props: [],
      data(){ 
        return {
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        onFileChange(fieldName, fileList) {

          const formData = new FormData();

          if (!fileList.length) return;
          
          formData.append("img", fileList[0]);
          formData.append("content_type", 0);

          this.save(formData);
        },
        save(formData) {

          const url = `https://api.pixhost.org/images`;
          return axios.post(url, formData)
            // get data
            .then(response => {
              let image_info = response.data;
            })
            .catch((response) => {
              console.log(response);
            });

          this.particularGif(image_info);

        },
        particularGif(image_info){
          this.$emit('seeOneGif', image_info);
        }   
      },
      created() {
      }
    }
</script>

<style>
</style>