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
							<button class="btn waves-effect waves-light right" @click="submitLogin">Enter</button>
						</div>
					</form>
				</div>
			</div>
		</div>
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
				}
			}
		},
		computed: {
		},
		methods: {
			submitLogin(){
				debugger
				const user = this.$store.getters.users_by_name(this.user);
				if (user) {
					this.$router.push('searchGIFs');
				}
			}
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
</style>