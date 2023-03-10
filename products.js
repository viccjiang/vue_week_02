import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


const app = createApp({
	data() {
		return {
			apiUrl: 'https://vue3-course-api.hexschool.io/v2',
			apiPath: 'jiangs2023',
			allProducts: [],
			tempProduct: {},
		}
	},
	methods: {
		checkLogin() {
			axios.post(`${this.apiUrl}/api/user/check`)
				.then(res => {
					console.log(res);
					this.getProduct()
				})
				.catch(err => {
					console.log(err.data.message);
					window.location = 'index.html';
				})
		},
		getProduct(){
			axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
				.then(res=>{
					console.log(res.data);
					this.allProducts = res.data.products;
				})
				.catch(err => {
					console.log(err.data.message);
				})
		},
		productDetail(perItem){
			this.tempProduct = perItem
		}
	},
	mounted() {
		// 取出 Token
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)jiangvue3\s*=\s*([^;]*).*$)|^.*$/, '$1');
		axios.defaults.headers.common.Authorization = token;
		this.checkLogin();
	},
})

app.mount('#app')