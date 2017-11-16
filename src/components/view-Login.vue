<template>
	<div class="container">
		<div class="row">
			<div class="col s4 m4 l4 offset-l4">
				<div class="ac-custom ac-radio ac-circle negrita card blue-grey darken-1 login"> 
					<form>
						<div> <!-- form group --> 
							<i class="material-icons">account_circle</i>
							<input type="text" name="username" v-model="user.username" placeholder="Enter your username">
						</div>
						<div> <!-- form group --> 
							<i class="material-icons">lock_open</i>
							<input type="password" name="userpass" v-model="user.password">
						</div>
						<div class="row">
							<button class="btn waves-effect waves-light right" @click.prevent="submitLogin">Enter</button>
							
						</div>
					</form>
				</div>
			</div>
		</div>

		<transition name="modal">  	<!-- transiciones fuera del v-if !!!! --> 
			<div v-if="errorMsg">
				<div class="modal-mask" v-show="errorMsg" @click.self="close">
					<div class="modal-container">
						<div class="modal-header center-align">
						    <h3>Wrong!</h3>
						</div>
						<div class="modal-body">
						    <h5 class="black-text">Sorry! Username or password incorrect.</h5>
						</div>
						<div class="modal-footer text-right">
						    <button class="btn waves-effect waves-light right" @click="errorMsg = false">
						            Understood
						    </button>
						</div>
					</div>
				</div>
			</div>
		</transition>

	</div>
</template>

<script>
	export default {
		name: 'viewLogin',
		data () {
			return {
				user: {
					username: '',
					password: ''
				},
				errorMsg: false,
				show: false
			}
		},
		computed: {
			usuarios() {
				return this.$store.state.users;
			}
		},
		methods: {
			submitLogin(){
				const user = this.$store.getters.users_by_name(this.user);
				if(user != undefined) {
					this.$store.commit('login');
					this.$router.push('searchGIFs');
				} else {
					this.errorMsg = true;
				}
			},
			close(){
				this.errorMsg = false;
			}
		},
		mounted() {
			document.addEventListener("keydown", (e) => {  /*La idea es para tener el chiche de cerrarlo con la tecla esc*/
				if (this.errorMsg && e.keyCode == 27) {		/*No recomendable en mundo real*/
					this.close();
				}
			})
		}
	}

	
</script>

<style>
	.login{
		margin: 150px 0px 0px 0px;
	}

	.btn{
		margin: 0px 60px 0px 0px;
	}

	.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 300px;
	  margin: 0px auto;
	  padding: 20px 30px;
	  background-color: #fff;
	  border-radius: 2px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: transform .3s ease;
	  font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h3 {
	  margin-top: 0;
	  color: #42b983;
	}

	.modal-body {
	  margin: 20px 0;
	}

	.modal-default-button {
	  float: right;
	}

	/*
	 * The following styles are auto-applied to elements with
	 * transition="modal" when their visibility is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */

	.modal-enter-active, .modal-leave-active {
		  transition: opacity .5s
		}
	.modal-enter, .modal-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}

</style>