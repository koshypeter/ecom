<template>
  <div id="app">
    <AppNavbar
      :cartCount="cartCount"
      @resetCartCount="resetCartCount"
      v-if="!['Signup', 'Signin'].includes($route.name)"
    />

    <div style="min-height: 60vh">
      <router-view
        v-if="products && categories"
        :baseURL="baseURL"
        :products="products"
        :categories="categories"
        @fetchData="fetchData"
      />
    </div>

    <AppFooter v-if="!['Signup', 'Signin'].includes($route.name)" />
  </div>
</template>




<script>
import axios from 'axios';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },
  data() {
    return {
      
      baseURL: 'http://localhost:8080/',
      products: null,
      categories: null,
      cartCount: 0,
      token: null
    };
  },
  methods: {
    async fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`${this.baseURL}product/`),
          axios.get(`${this.baseURL}category/`)
        ]);
        this.products = productsRes.data;
        this.categories = categoriesRes.data;

        if (this.token) {
          const cartRes = await axios.get(`${this.baseURL}cart/?token=${this.token}`);
          if (cartRes.status === 200) {
            this.cartCount = Object.keys(cartRes.data.cartItems).length;
          }
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    },
    resetCartCount() {
      this.cartCount = 0;
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchData();
  }
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
