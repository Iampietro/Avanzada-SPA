<template>
  <div class="container">
    <div class="negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h3>Upload an image or a GIF</h3><br>
            <div class="row">

              <div class="col l12 m12 s12">

                <div v-if="failed">
                    <div class="alertfailed">
                      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                      Your file failed to upload.
                    </div>
                </div>

                <div v-if="!edited_url" id="app">
                  <form enctype="multipart/form-data">
                    <label v-if="!loading" class="btn waves-effect waves-light">Select file
                      <input type="file" @change="onFileChange($event.target.name, $event.target.files);"
                      accept="image/*" class="btn waves-effect waves-light right">

                    </label><br><br>
                      
                      <div v-if="loading" class="progress">
                          <div class="indeterminate"></div>
                      </div>
                  </form>
                </div>
                
                <div v-else>
                  <div class="alert">
                    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                    Your file has been uploaded.
                  </div>

                  <form enctype="multipart/form-data">
                    <label v-if="!loading" class="btn waves-effect waves-light">Upload another file
                      <input type="file" @change="onFileChange($event.target.name, $event.target.files);"
                      accept="image/*" class="btn waves-effect waves-light right">

                    </label><br>
                      
                      <div v-if="loading" class="progress">
                          <div class="indeterminate"></div>
                      </div>
                  </form><br>

                  <div style="overflow:hidden;"><h6><b class="padsito">URL</b><i>{{ edited_url }}</i></h6></div><br>
                  <div class="center-align"><img class="uploaded img-responsive z-depth-5 justuploaded" 
                      :src="edited_url">
                  </div>
                </div>

              </div>
          </div>
        </div>
    </div> 
    <br>
  </div>
</template>

<script>
import axios from "axios"

import config from "./../config/config";

export default {
      name: 'viewUpload',
      props: [],
      data(){ 
        return {
          loading: false,
          loaded: false, //creo que esto no hace nada ajaj
          failed: false,
          image_url: '',
          edited_url: ''
        }
      },
      mounted() {
      },
      computed:{
      },
      watch: {
        
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
          this.failed = false;
          this.loading = true;
          return axios.post(config.UPLOAD_URL, formData)
            // get data
            .then(response => {
              this.image_url = response.data.show_url;
              this.loading = false;
              this.loaded = true;
              this.show_it_to_me(this.image_url);
            })
            .catch((response) => {
              this.loading = false;
              this.failed = true;
              console.log(response);
            });
        },
        show_it_to_me(){
          this.edited_url = config.EDITED_URL + this.image_url.slice(24);
          this.$store.commit('saveUpload', this.edited_url);

        },
        uploadAnother(){
          this.edited_url = '';
        }
      },
      created() {
      }
    }
</script>

<style>

input[type="file"] {
    display: none;
}

.alert {
    padding: 20px;
    background-color: #66ff66;
    color: black;
    margin-bottom: 15px;
}

.alertfailed {
  padding: 20px;
  background-color: red;
  color: black;
  margin-bottom: 15px;

}

.closebtn {
    margin-left: 15px;
    color: black;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

.closebtn:hover {
    color: white;
}

  .progress {
    padding-top: 5px;
  }

.padsito{
  padding-right: 5px;
}

.uploaded {
  margin: 20px 20px 20px 20px;
}

</style>