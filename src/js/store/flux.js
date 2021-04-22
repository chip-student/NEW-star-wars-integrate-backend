import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			planets: [],
			favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadPlanets: async () => {
				const url = "https://3000-silver-mandrill-m4t2ud0g.ws-us03.gitpod.io/planets/";
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();

				// console.log(">>DATA PLANETS>>", data);

				setStore({ planets: data });
			},
			loadCharacters: async () => {
				const url = "https://3000-silver-mandrill-m4t2ud0g.ws-us03.gitpod.io/people/";

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				// console.log(">>DATA PEOPLE>>", data);
				setStore({ characters: data });
			},
			//[GET] /users/<int:user_id>/favoritesGet all the favorites that belong to the user with the id = user_id
			loadUserFavoritos: async () => {
				// const url = "https://3000-silver-mandrill-m4t2ud0g.ws-us03.gitpod.io/getuserfav/"+iduser;
				const url = "https://3000-silver-mandrill-m4t2ud0g.ws-us03.gitpod.io/getuserfav/" + 1;

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const data = await response.json();
				// console.log(">>DATA FAVORITES USERID>>", data);

				let listNames = "";

				//get the store
				const store = getStore();

				let listNameFavorite = data.map(async elm => {
					// console.log("elm.idpeople " + elm.idpeople);

					if (elm.idpeople === null) {
						listNames = store.planets.map(item => {
							if (item.id === elm.idplanet) {
								return item.name;
							}
						});
					}
					// console.log("elm.idplanet " + elm.idplanet);
					if (elm.idplanet === null) {
						listNames = store.characters.map(item => {
							if (item.id === elm.idpeople) {
								return item.name;
							}
						});
					}
					return listNames;
				});

				let finalData = await Promise.all(listNameFavorite);
				// console.log("listNameFavorite <<>> " + finalData);

				let res = finalData.map(item => {
					store.favorites.push(item);
				});

				setStore({ favorites: store.favorites });
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// [POST] /users/<int:user_id>/favoritesAdd a new favorite to the user with the id = user_id.
			addFavorites: async name => {
				//get the store
				const store = getStore();

				//People
				let idPeople = store.characters.map(item => {
					if (item.name === name) {
						return item.id;
					}
				});

				if (idPeople === "undefined") {
					idPeople = null;
				}
				console.log("idPeople >> " + idPeople);
				let idPlanet = store.planets.map(item => {
					if (item.name === name) {
						return item.id;
					}
				});
				if (idPlanet === "undefined") {
					idPlanet = null;
				}
				console.log("idPlanet >> " + idPlanet);
				let data = {
					idpeople: idPeople,
					idplanet: idPlanet
				};

				console.log(data);

				// se prueba con un usuario
				let iduser = 1;

				const url = "https://3000-silver-mandrill-m4t2ud0g.ws-us03.gitpod.io/postuserfav/" + iduser;
				//guarda informacion Favoritos API
				await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				})
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));

				store.favorites.push(name);

				setStore({ favorites: store.favorites });

				// console.log(store.favorites);
			},
			// [DELETE] /favorite/<int:favorite_id>Delete favorite with the id = favorite_id.
			deleteFavorites: id => {
				// console.log(id);
				//get the store
				const store = getStore();

				const newList = store.favorites.filter(function(currentValue, index) {
					return id !== index;
				});
				setStore({ favorites: newList });
			}
		}
	};
};

export default getState;
