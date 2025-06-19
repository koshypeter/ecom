<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping cart</h3>
        <hr />
      </div>
    </div>

    <!-- Cart Items -->
    <div
      v-for="cartItem in cartItems"
      :key="cartItem.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>

      <!-- Product Image -->
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product.id } }">
          <img
            :src="cartItem.product.imageURL"
            class="w-100 card-img-top embed-responsive-item"
            alt="Product Image"
          />
        </router-link>
      </div>

      <!-- Product Info -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.product.id } }">
              {{ cartItem.product.name }}
            </router-link>
          </h6>

          <p id="item-price" class="mb-0 font-weight-bold">
            ${{ cartItem.product.price }} per unit
          </p>

          <p id="item-quantity" class="mb-0">
            Quantity:
            <input
              size="1"
              class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
              v-model.number="cartItem.quantity"
            />
          </p>

          <p id="item-total-price" class="mb-0">
            Total Price:
            <span class="font-weight-bold">
              ${{ (cartItem.product.price * cartItem.quantity).toFixed(2) }}
            </span>
          </p>

          <br />
          <a href="#" class="text-right text-danger" @click.prevent="deleteItem(cartItem.id)">
            Remove From Cart
          </a>
        </div>
      </div>

      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <!-- Total Cost -->
    <div class="total-cost pt-2 text-right">
      <h5>Total: ${{ totalCost.toFixed(2) }}</h5>
      <button
        :disabled="isCartEmpty"
        type="button"
        class="btn btn-primary confirm"
        @click="checkout"
      >
        Confirm Order
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cart",
  props: {
    baseURL: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cartItems: [],
      token: localStorage.getItem("token")
    };
  },
  computed: {
    totalCost() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );
    },
    isCartEmpty() {
      return this.cartItems.length === 0;
    }
  },
  methods: {
    async fetchCartItems() {
      try {
        const res = await axios.get(`${this.baseURL}cart/?token=${this.token}`);
        if (res.status === 200) {
          this.cartItems = res.data.cartItems;
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        swal({
          text: "Error loading cart. Please try again.",
          icon: "error",
          closeOnClickOutside: false
        });
      }
    },
    async deleteItem(itemId) {
      try {
        const res = await axios.delete(
          `${this.baseURL}cart/delete/${itemId}/?token=${this.token}`
        );
        if (res.status === 200) {
          await this.fetchCartItems();
          this.$emit("fetchData");
        }
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    },
    checkout() {
      this.$router.push({ name: "Checkout" });
    }
  },
  mounted() {
    if (!this.token) {
      this.$router.push({ name: "Signin" });
    } else {
      this.fetchCartItems();
    }
  }
};
</script>

<style scoped>
h3,
h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}

.embed-responsive .card-img-top {
  object-fit: cover;
}

#item-price {
  color: #232f3e;
}

#item-quantity {
  float: left;
}

#item-total-price {
  float: right;
}

.confirm {
  font-weight: bold;
  font-size: larger;
}
</style>
