import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		users: [
			{
				user: {
					username: 'iampietro',
					password: 'punteo',
					authorized: false
				}
			},
			{
				user: {
					username: 'cooper',
					password: 'crystalmountain'
				}
			},
			{
				user: {
					username: 'fuka',
					password: 'notKilmes'
				}
			},
			{
				user: {
					username: 'lisandro',
					password: 'pantera'
				}
			}
		]
	},
	getters: {
		users_by_name: (state, getters) => (userToFind) =>  {
			return state.users.find(userIterator => userIterator.user.username === userToFind.username &&
													userIterator.user.password == userToFind.password)
		}
	},
	mutations: {
	}
})