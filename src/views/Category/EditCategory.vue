<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Category</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="category">
          <div class="form-group">
            <label>Category Name</label>
            <input type="text" class="form-control" v-model="category.categoryName" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="category.description" required>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" class="form-control" v-model="category.imageUrl" required>
          </div>
          <button type="button" class="btn btn-primary" @click="editCategory">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCategory',
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
  data() {
    return {
      category: null,
      id: null
    };
  },
  methods: {
    async editCategory() {
      try {
        const updatedCategory = { ...this.category };
        delete updatedCategory.products;

        const response = await axios.post(
          `${this.baseURL}category/update/${this.id}`,
          updatedCategory
        );

        if (response.status === 200) {
          this.$emit('fetchData');
          this.$router.push({ name: 'AdminCategory' });
          swal({
            text: 'Category Updated Successfully!',
            icon: 'success',
            closeOnClickOutside: false
          });
        }
      } catch (error) {
        console.error('Failed to update category:', error);
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
      return;
    }

    this.id = this.$route.params.id;

    const found = this.categories.find(cat => String(cat.id) === String(this.id));
    if (found) {
      this.category = { ...found }; // shallow copy to avoid mutating prop
    } else {
      swal({
        text: 'Category not found!',
        icon: 'error',
        closeOnClickOutside: false
      });
      this.$router.push({ name: 'AdminCategory' });
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
</style>
