<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Our Categories</h4>
        <router-link
          id="add-category"
          :to="{ name: 'AddCategory' }"
          v-show="$route.name === 'AdminCategory'"
        >
          <button class="btn">Add a new Category</button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div
        v-for="category in categories"
        :key="category.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <CategoryBox :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from '../../components/Category/CategoryBox.vue';

export default {
  name: 'CategoryView',
  components: {
    CategoryBox
  },
  props: {
    baseURL: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  mounted() {
    const isAdminRoute = this.$route.name === 'AdminCategory';
    const hasToken = localStorage.getItem('token');

    if (isAdminRoute && !hasToken) {
      this.$router.push({ name: 'Signin' });
    }
  }
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

#add-category {
  float: right;
  font-weight: 500;
}
</style>
