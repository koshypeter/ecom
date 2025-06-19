<template>
  <div id="home">
    <!-- Page Wrapper -->
    <div id="background-div" class="page-holder bg-cover">
      <div class="container py-5">
        <header class="text-left text-white py-5">
          <h3 class="mb-4 rounded">
            <a href="#start-shopping" class="bg-white px-2 py-2 rounded" id="heading">Start Shopping</a>
          </h3>
          <p id="content" class="lead mb-0 bg-dark p-1 rounded">
            Simple Comm is a basic ecommerce website built to showcase a complete website using Vue.js and Java Springboot.
          </p>
        </header>
      </div>
    </div>

    <!-- Top Categories -->
    <div id="start-shopping" class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Top Categories</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="category in topCategories" :key="category.id" class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
          <CategoryBox :category="category" />
        </div>
      </div>
    </div>

    <hr />

    <!-- Top Products -->
    <div class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="pt-3">Top Products</h2>
        </div>
      </div>
      <div class="row">
        <div v-for="product in topProducts" :key="product.id" class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex">
          <ProductBox :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "../components/Product/ProductBox.vue";
import CategoryBox from "../components/Category/CategoryBox.vue";

export default {
  name: "HomeView",
  components: {
    ProductBox,
    CategoryBox
  },
  props: {
    baseURL: String,
    products: Array,
    categories: Array
  },
  computed: {
    topCategories() {
      return this.categories?.slice(0, 6) || [];
    },
    topProducts() {
      return this.products?.slice(0, 8) || [];
    }
  }
};
</script>

<style>
.page-holder {
  min-height: 100vh;
}

.bg-cover {
  background-size: cover !important;
}

#background-div {
  background: url(../assets/home.png);
}

#heading {
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 400;
  opacity: 0.8;
}

#content {
  opacity: 0.8;
}

h2 {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
