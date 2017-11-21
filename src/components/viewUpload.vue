<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h3>Upload an image or a GIF</h3>
            <div class="row">
              <div class="col l12">

                <div v-if="!edited_url" id="app">
                  <form enctype="multipart/form-data">
                    <label class="btn waves-effect waves-light">Select file
                      <input type="file" @change="onFileChange($event.target.name, $event.target.files);"
                      accept="image/*" class="btn waves-effect waves-light right">
                    </label><br>
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
                  <label><b>URL</b> <i>{{ edited_url }}</i></label>
                  <div class="row"><img :src="edited_url"></div>
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
export default {
      name: 'viewUpload',
      props: [],
      data(){ 
        return {
          loading: false,
          loaded: false,
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
          this.loading = true;
          const url = `https://api.pixhost.org/images`;
          return axios.post(url, formData)
            // get data
            .then(response => {
              this.image_url = response.data.show_url;
              this.loading = false;
              this.loaded = true;
              this.show_it_to_me(this.image_url);
            })
            .catch((response) => {
              console.log(response);
            });
        },
        show_it_to_me(){
          this.edited_url = "https://img15.pixhost.org/images" + this.image_url.slice(24);
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
</style>