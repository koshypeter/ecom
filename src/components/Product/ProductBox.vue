<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="product.imageURL"
        :alt="product.name"
      />
    </div>

    <div class="card-body">
      <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }">
        <h5 class="card-title">{{ product.name }}</h5>
      </router-link>

      <p class="card-text">
        <sup>$</sup>{{ product.price }}
      </p>

      <p class="card-text font-italic">
        {{ truncatedDescription }}
      </p>

      <router-link
        id="edit-product"
        :to="{ name: 'EditProduct', params: { id: product.id } }"
        v-show="$route.name === 'AdminProduct'"
      >
        Edit
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: {
      type: Object,
      required: true,
      validator: (p) =>
        typeof p.id === "number" &&
        typeof p.name === "string" &&
        typeof p.price === "number" &&
        typeof p.description === "string" &&
        typeof p.imageURL === "string"
    }
  },
  computed: {
    truncatedDescription() {
      return this.product.description.length > 65
        ? this.product.description.substring(0, 65) + "..."
        : this.product.description;
    }
  }
};
</script>

<style scoped>
.embed-responsive .card-img-top {
  object-fit: cover;
}

a {
  text-decoration: none;
}

.card-title {
  color: #484848;
  font-size: 1.1rem;
  font-weight: 400;
}

.card-title:hover {
  font-weight: bold;
}

.card-text {
  font-size: 0.9rem;
}

#edit-product {
  float: right;
}
</style>
