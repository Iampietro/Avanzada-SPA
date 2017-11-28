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
					lastSearchs: [],
					uploadedImages: []
				}
			},
			{
				user: {
					username: 'cooper',
					password: 'crystalmountain',
					savedGifs: [],
					lastSearchs: [],
					uploadedImages: []
				}
			},
			{
				user: {
					username: 'fuka',
					password: 'notKilmes',
					savedGifs: [],
					lastSearchs: [],
					uploadedImages: []
				}
			},
			{
				user: {
					username: 'lisandro',
					password: 'pantera',
					savedGifs: [],
					lastSearchs: [],
					uploadedImages: []
				}
			},
			{
				user: {
					username: 'a',
					password: 'a',
					savedGifs: [],
					lastSearchs: [],
					uploadedImages: []
				}
			}
		],
		authorized : false,
		justLoggedUser: {},
		gifFromGallery: null,
		gifFromTrending: null,
		toShowGallery: null
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

			const indexUser = state.users.indexOf(state.justLoggedUser);
			const name = state.justLoggedUser.user.username;
			let previousGifs = localStorage.getItem('imagesOf:' + name);
			let previousUploads = localStorage.getItem('uploadedBy:' + name);

			if (previousGifs) {
				 previousGifs = JSON.parse(previousGifs);
				 state.users[indexUser].user.savedGifs = previousGifs;
			}
			if (previousUploads) {
				previousUploads = JSON.parse(previousUploads);
				state.users[indexUser].user.uploadedImages = previousUploads;
			}

		},
		logout(state){
			state.authorized = false;
		},
		saveGif(state, gif){
			const name = state.justLoggedUser.user.username;
			let previousGifs = localStorage.getItem('imagesOf:' + name);
			if (previousGifs) {
				 previousGifs = JSON.parse(previousGifs);
				 state.users[state.users.indexOf(state.justLoggedUser)].user.savedGifs = previousGifs;
			}

			state.users[state.users.indexOf(state.justLoggedUser)].user.savedGifs.push(gif);
			localStorage.setItem('imagesOf:' + name, JSON.stringify(state.users[state.users.indexOf(state.justLoggedUser)].user.savedGifs));
			
		},
		removeGif(state, gif){
			const name = state.justLoggedUser.user.username;
			const indexUser = state.users.indexOf(state.justLoggedUser);
			const indexGif = state.users[indexUser].user.savedGifs.indexOf(gif);

			state.users[indexUser].user.savedGifs = state.users[indexUser].user.savedGifs.slice(0, indexGif)
													.concat(state.users[indexUser].user.savedGifs.slice(indexGif + 1));
			localStorage.setItem('imagesOf:' + name, JSON.stringify(state.users[indexUser].user.savedGifs));

		},
		saveSearch(state, search){
			const indexUser = state.users.indexOf(state.justLoggedUser);
			if (state.users[indexUser].user.lastSearchs.length > 7) {
				state.users[indexUser].user.lastSearchs.slice(1);
				state.users[indexUser].user.lastSearchs.push(search);
			} else {
				state.users[indexUser].user.lastSearchs.push(search);
			}
		},
		saveUpload(state, imageToSave){
			const name = state.justLoggedUser.user.username;
			const indexUser = state.users.indexOf(state.justLoggedUser);
			let previousUploads = localStorage.getItem('uploadedBy:' + name);
			if (previousUploads) {
				previousUploads = JSON.parse(previousUploads);
				state.users[indexUser].user.uploadedImages = previousUploads;
			}
			state.users[indexUser].user.uploadedImages.push(imageToSave);
			localStorage.setItem('uploadedBy:' + name, JSON.stringify(state.users[indexUser].user.uploadedImages));
		},
		galleryGif(state, gif){
			state.gifFromGallery = gif;
		},
		trendingGif(state, gif){
			state.gifFromTrending = gif;
		},
		cleanGifs(state){
			state.gifFromTrending = null;
			state.gifFromGallery = null;
		},
		addComent(state, array){
			const name = state.justLoggedUser.user.username;
			const whereTo = array[2];
			if (whereTo == "savedGifs") {
				for (var i = 0; i < state.justLoggedUser.user.savedGifs.length; i++) {
					if (state.justLoggedUser.user.savedGifs[i].id == array[0].id) {
						state.justLoggedUser.user.savedGifs[i].coments.push(array[1])
					}
				}
				localStorage.setItem('imagesOf:' + name, JSON.stringify(state.justLoggedUser.user.savedGifs));

			} else {
				for (var i = 0; i < state.justLoggedUser.uploadedImages.length; i++) {
					if (state.justLoggedUser.uploadedImages[i].id == image.id) {
						state.justLoggedUser.uploadedImages[i].coments.push(coment)
					}
				}
			}
		},
		check(state){ // Perdon por la hardcodeada
			let previousGifs = localStorage.getItem('imagesOf:' + 'iampietro');
			if (previousGifs) {
				previousGifs = JSON.parse(previousGifs);
				state.users[0].user.savedGifs = previousGifs;
			}

			previousGifs = localStorage.getItem('imagesOf:' + 'cooper');
			if (previousGifs) {
				previousGifs = JSON.parse(previousGifs);
				state.users[1].user.savedGifs = previousGifs;
			}

			previousGifs = localStorage.getItem('imagesOf:' + 'fuka');
			if (previousGifs) {
				previousGifs = JSON.parse(previousGifs);
				state.users[2].user.savedGifs = previousGifs;
			}

			previousGifs = localStorage.getItem('imagesOf:' + 'lisandro');
			if (previousGifs) {
				previousGifs = JSON.parse(previousGifs);
				state.users[3].user.savedGifs = previousGifs;
			}

			previousGifs = localStorage.getItem('imagesOf:' + 'a');
			if (previousGifs) {
				previousGifs = JSON.parse(previousGifs);
				state.users[4].user.savedGifs = previousGifs;
			}
		},
		pass(state, user){
			state.toShowGallery = user;
		}
	}
})