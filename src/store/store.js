import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [
			{
				user: {
					username: 'juan',
					password: 345
				}
			},
			{
				user: {
					username: 'm',
					password: 123
				}
			}
		]
	},
	getters: {
		users_by_name: (state, getters) => (userToFind) =>  {
			return state.users.find(userIterator => userIterator.user.username === userToFind.username &&
													userIterator.user.password == userToFind.password)
		}
	}
})