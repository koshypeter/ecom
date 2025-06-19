<template>
  <div class="image-box">
    <img
      :src="image.url"
      :alt="image.name"
      class="img-fluid my-image"
      ref="rimage"
    />
    <div class="middle">
      <button class="btn btn-info" @click="copyToClipboard">
        Copy Address
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageBox",
  props: {
    image: {
      type: Object,
      required: true,
      validator: (value) =>
        typeof value.url === "string" && typeof value.name === "string"
    }
  },
  methods: {
    async copyToClipboard() {
      const imageSrc = this.$refs.rimage?.src;

      if (!imageSrc) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(imageSrc);
        } else {
          // Fallback for older browsers
          const el = document.createElement("textarea");
          el.value = imageSrc;
          el.setAttribute("readonly", "");
          el.style.position = "absolute";
          el.style.left = "-9999px";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }

        swal({
          text: "Image address copied to clipboard!",
          icon: "success",
          closeOnClickOutside: false
        });
      } catch (err) {
        swal({
          text: "Failed to copy address!",
          icon: "error",
          closeOnClickOutside: false
        });
        console.error("Copy to clipboard failed:", err);
      }
    }
  }
};
</script>

<style scoped>
.image-box {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px;
}

.image-box img {
  width: 100%;
  height: 100%;
  opacity: 1;
  border-radius: 5px;
  padding: 5px;
  border: 0.5px solid rgb(216, 216, 216);
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  transition: 0.5s ease;
}

.image-box:hover .my-image {
  transform: scale(1.1);
  opacity: 0.3;
  transition: transform 0.2s ease;
}

.image-box:hover .middle {
  opacity: 1;
}
</style>
