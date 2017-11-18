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
		saveGif(state, user, gif){
			state.users[state.users.indexOf(user)].savedGifs.push(gif);
		},
		removeGif(state, user, gif){
			const indexUser = state.users.indexOf(user);
			const indexGif = state.users[indexUser].user.savedGifs.indexOf(gif);

			state.users[indexUser].user.savedGifs.slice(0, indexGif)
											.concat(state.users[indexUser].user.savedGifs.slice(indexGif + 1));
		},
		saveSearch(state, user, search){
			const indexUser = state.users.indexOf(user);
			if (state.users[indexUser].user.lastSearchs.length > 7) {
				state.users[indexUser].user.lastSearchs.slice(1);
				state.users[indexUser].user.lastSearchs.push(search);
			} else {
				state.users[indexUser].user.lastSearchs.push(search);
			}
		}
	}
})