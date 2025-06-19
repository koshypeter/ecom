<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add new Category</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form @submit.prevent="addCategory">
          <div class="form-group">
            <label for="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              class="form-control"
              v-model.trim="categoryName"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text"
              id="description"
              class="form-control"
              v-model.trim="description"
              required
            />
          </div>

          <div class="form-group">
            <label for="imageURL">Image URL</label>
            <input
              type="url"
              id="imageURL"
              class="form-control"
              v-model.trim="imageURL"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCategory",
  props: {
    baseURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      categoryName: "",
      description: "",
      imageURL: ""
    };
  },
  methods: {
    async addCategory() {
      if (!this.categoryName || !this.description || !this.imageURL) {
        swal({
          text: "All fields are required!",
          icon: "warning",
          closeOnClickOutside: false
        });
        return;
      }

      const newCategory = {
        categoryName: this.categoryName,
        description: this.description,
        imageUrl: this.imageURL
      };

      try {
        const response = await axios.post(
          `${this.baseURL}category/create`,
          newCategory,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (response.status === 200 || response.status === 201) {
          this.$emit("fetchData");
          this.$router.push({ name: "AdminCategory" });
          swal({
            text: "Category Added Successfully!",
            icon: "success",
            closeOnClickOutside: false
          });
        }
      } catch (error) {
        console.error("Error adding category:", error);
        swal({
          text: "Something went wrong. Try again later.",
          icon: "error",
          closeOnClickOutside: false
        });
      }
    }
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "Signin" });
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
