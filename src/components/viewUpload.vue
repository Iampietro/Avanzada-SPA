<template>
  <div class="container">
    <div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1">
        <div class="card-content" autocomplete="off">
          <h2>Upload</h2>
            <div class="row">
              <div class="col l12">
                
                <div v-if="!image">
                  <h2>Select an image</h2>
                  <input type="file" @change="on_file_change" class="btn waves-effect waves-light right">
                </div>
                <div v-else>
                  <img :src="image" />
                  <button class="btn waves-effect waves-light right" @click="remove_image">Remove image</button>
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
          this.$http.post('https://api.pixhost.org/images&img=' + this.image + '&content_type=0').then((response) => {
              console.log("se pudoo");
              console.log(response.status)
            })
            .catch((error) => {
             console.log(error);
           })
            //this.message = true;
            //setTimeout(this.message_false, 4000);
        }
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
