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
					savedGifs: []
				}
			},
			{
				user: {
					username: 'cooper',
					password: 'crystalmountain',
					savedGifs: []
				}
			},
			{
				user: {
					username: 'fuka',
					password: 'notKilmes',
					savedGifs: []
				}
			},
			{
				user: {
					username: 'lisandro',
					password: 'pantera',
					savedGifs: []
				}
			}
		],
		authorized : false,
		justLoggedUser: {}
	},
	getters: {
		users_by_name: (state, getters) => (userToFind) =>  {
			return state.users.find(userIterator => userIterator.user.username === userToFind.username &&
													userIterator.user.password == userToFind.password)
		}
	},
	mutations: {
		login(state, user){
			state.authorized = true;
			state.justLoggedUser = user;
		},
		logout(state){
			state.authorized = false;
		},
		saveGif(state, user, gif){
			state.users[state.users.indexOf(user)].savedGifs.push(gif);
		},
		removeGif(state, user, gif){
			const indexUser = state.users[state.users.indexOf(user)];
			const indexGif = state.users[indexUser].savedGifs[state.users[indexUser].savedGifs.indexOf(gif)];

			state.users[indexUser].savedGifs.slice(0, indexGif)
											.concat(state.users[indexUser].savedGifs.slice(indexGif + 1));
		}
	}
})