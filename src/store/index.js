import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		products: [],
		checkedProducts: []
	},
	getters: {
		getProducts(state) {
			return state.products;
		},
		getCheckedProducts(state) {
			return state.checkedProducts;
		}
	},
	mutations: {
		setProducts(state, products) {
			state.products = products;
		},
		addCheckedProduct(state, product) {
			state.checkedProducts.push({
				id: product
			});
		},
		uncheckCheckedProductById(state, id) {
			let products = state.checkedProducts;

			products = state.checkedProducts.filter(item => item.id !== id);
			state.checkedProducts = products;
		},
		uncheckCheckedProducts(state) {
			state.checkedProducts = [];
		},
		removeCheckedProducts(state) {
			var prods = [];
			state.checkedProducts.filter(item => { 
				prods = state.products.filter(product => {
					if(item.id.indexOf(product.id) == -1) {
						return product;
					}
				});
				state.products = prods;

			});
			state.checkedProducts = [];
			Vue.set(state, 'products', prods);
		},
		removeProduct(state, id) {
			let prods = [];
			prods = state.products.filter(product => {
				if(product.id !== id) {
					return product;
				}
			});
			Vue.set(state,'products',prods);
		}
	}
});
