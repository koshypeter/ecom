<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Gallery</h4>
        <router-link id="add-image" :to="{ name: 'AddImage' }">
          <button class="btn">Add a new Image</button>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div
        v-for="image in images"
        :key="image.name"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <ImageBox :image="image" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import ImageBox from '../../components/Image/ImageBox.vue';

export default {
  name: 'Gallery',
  components: {
    ImageBox
  },
  props: {
    baseURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      images: null
    };
  },
  methods: {
    async fetchImages() {
      try {
        const response = await axios.get(`${this.baseURL}fileUpload/`);
        this.images = response.data;
      } catch (error) {
        console.error("Error fetching images:", error);
        swal({
          text: "Failed to load images.",
          icon: "error",
          closeOnClickOutside: false
        });
      }
    }
  },
  beforeMount() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
    }
  },
  mounted() {
    this.fetchImages();
  }
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

#add-image {
  float: right;
  font-weight: 500;
}
</style>
