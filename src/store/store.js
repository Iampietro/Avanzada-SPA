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
					savedGifs: [],
					lastSearchs: []
				}
			},
			{
				user: {
					username: 'cooper',
					password: 'crystalmountain',
					savedGifs: [],
					lastSearchs: []
				}
			},
			{
				user: {
					username: 'fuka',
					password: 'notKilmes',
					savedGifs: [],
					lastSearchs: []
				}
			},
			{
				user: {
					username: 'lisandro',
					password: 'pantera',
					savedGifs: [],
					lastSearchs: []
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
		saveGif(state, gif){
			state.users[state.users.indexOf(justLoggedUser)].savedGifs.push(gif);
		},
		removeGif(state, gif){
			const indexUser = state.users.indexOf(justLoggedUser);
			const indexGif = state.users[indexUser].user.savedGifs.indexOf(gif);

			state.users[indexUser].user.savedGifs.slice(0, indexGif)
											.concat(state.users[indexUser].user.savedGifs.slice(indexGif + 1));
		},
		saveSearch(state, search){
			const indexUser = state.users.indexOf(justLoggedUser);
			if (state.users[indexUser].user.lastSearchs.length > 7) {
				state.users[indexUser].user.lastSearchs.slice(1);
				state.users[indexUser].user.lastSearchs.push(search);
			} else {
				state.users[indexUser].user.lastSearchs.push(search);
			}
		}
	}
})