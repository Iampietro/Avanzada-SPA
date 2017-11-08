<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Upload</h2>
            <div class="row">
              <div class="col l12">
                
                <input type="file" name="images[]" id="image-upload" @change="imagePreview($event)">

                <button
                  :class="{ 'btn-medium': true, 'is-loading': isLoading }"
                  @click.prevent="sharePikir($event)">
                  Paýlaşmak
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
          pikir: {
            body: '',
          },
          isLoading: false,
          images: []
        }
      },
      mounted() {
      },
      computed:{
      },
      methods:{
        
        imagePreview(event) {
          let input = event.target;
          if (input.files[0]) {
              
            let reader = new FileReader();

            reader.onload = e => {
              this.images.push(e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
              
            Array.from(Array(event.target.files.length).keys())
              .map(x => {
                this.formData
                  .append('img',
                    event.target.files[x], event.target.files[x].name);
                  this.formData
                  .append('content_type', 0);
            });
          }
        },

        sharePikir() {
          this.formData.append('body', this.pikir.body);
          
          this.$http.post('https://api.pixhost.org/images', this.formData)
            .then(response => {
              this.pikir.body = '';
            })
            .catch(() => {
              console.log(response);
            });
        }


/*
        onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);
        },
        createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;

          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        removeImage: function (e) {
          this.image = '';
        },
        upload_image(){
          this.$http.post('https://api.pixhost.org/images&img=' + this.image + '&content_type=0').then((response) => {
              console.log(response.status)
            })
            .catch((error) => {
             console.log(error);
           })
            //this.message = true;
            //setTimeout(this.message_false, 4000);
        }*/
      },
      created() {
      }
    }
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
