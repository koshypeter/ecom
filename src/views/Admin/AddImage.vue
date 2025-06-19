<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add a new Image</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0 pt-5">
        <div class="form-group">
          <label for="myfile">Select image:</label>
          <input type="file" id="myfile" class="form-control-file" @change="handleFileSelect" />
        </div>
        <button type="button" class="btn btn-info" @click="uploadImage">Upload</button>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageUploader',
  props: {
    baseURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedFile) {
        swal({
          text: "Please select an image file first.",
          icon: "warning",
          closeOnClickOutside: false
        });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        swal({
          text: "Only JPEG, JPG, or PNG image files are allowed.",
          icon: "error",
          closeOnClickOutside: false
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        await axios.post(`${this.baseURL}fileUpload/`, formData);
        swal({
          text: "Image uploaded successfully!",
          icon: "success",
          closeOnClickOutside: false
        });
        this.$router.push({ name: "Gallery" });
      } catch (error) {
        swal({
          text: "Failed to upload image. Try again.",
          icon: "error",
          closeOnClickOutside: false
        });
        console.error("Upload error:", error);
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
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
</style>
