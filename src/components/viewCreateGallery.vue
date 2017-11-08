<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Upload</h2>
            <div class="row">
              <div class="col l12">
                

                <button v-model="name" @click.prevent="createGallery">
                  a ver
                </button>
                <!--<div id="app">
                  <div v-if="!image">
                    <h2>Select an image</h2>
                    <input type="file" @change="onFileChange">
                  </div>
                  <div v-else>
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                  </div>
                </div>

                <button class="btn waves-effect waves-light right" @click="upload_image">Upload</button>-->

            </div>
          </div>
        </div>
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
          var xhr = this.createCORSRequest('POST', 'https://api.pixhost.org/galleries?gallery_name=co0oper');
          if (!xhr) {
            throw new Error('CORS not supported');
          }
          xhr.send();
          /*
          this.$http.post('https://api.pixhost.org/galleries?gallery_name=cooooooper')
            .then(response => {
            })
            .catch(() => {
              console.log(response);
            });*/
        },
        createCORSRequest(method, url) {
          var xhr = new XMLHttpRequest();
          if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
            
            xhr.onload = function() {
              var responseText = xhr.responseText;
              console.log(responseText);
              // process the response.
            };

            xhr.onerror = function() {
              console.log('There was an error!');
            };

          } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

          } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

          }
          return xhr;
        }
      },
      created() {
      }
    }
</script>

<style>
  
</style>
