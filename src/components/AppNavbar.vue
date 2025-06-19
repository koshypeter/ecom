<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- Logo -->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img id="logo" src="../assets/icon.png" alt="Site Logo" />
    </router-link>

    <!-- Burger Button -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Nav Content -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Search Bar -->
      <form class="form-inline ml-auto mr-auto">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search Items"
            aria-label="Search"
            size="100"
          />
          <div class="input-group-prepend">
            <span class="input-group-text" id="search-button-navbar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </form>

      <!-- Dropdowns and Links -->
      <ul class="navbar-nav ml-auto">
        <!-- Browse Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="browseDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Browse
          </a>
          <div class="dropdown-menu" aria-labelledby="browseDropdown">
            <router-link class="dropdown-item" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="dropdown-item" :to="{ name: 'Product' }">Product</router-link>
            <router-link class="dropdown-item" :to="{ name: 'Category' }">Category</router-link>
          </div>
        </li>

        <!-- Accounts Dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link text-light dropdown-toggle"
            href="#"
            id="accountsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Accounts
          </a>
          <div class="dropdown-menu" aria-labelledby="accountsDropdown">
            <router-link
              class="dropdown-item"
              :to="{ name: token ? 'Wishlist' : 'Signin' }"
            >
              Wishlist
            </router-link>
            <router-link class="dropdown-item" :to="{ name: 'Admin' }">Admin</router-link>
            <router-link
              class="dropdown-item"
              v-if="!token"
              :to="{ name: 'Signin' }"
            >
              Log In
            </router-link>
            <router-link
              class="dropdown-item"
              v-if="!token"
              :to="{ name: 'Signup' }"
            >
              Sign Up
            </router-link>
            <a class="dropdown-item" v-if="token" href="#" @click.prevent="signout">
              Sign Out
            </a>
          </div>
        </li>

        <!-- Orders -->
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'Order' }">
            Orders
          </router-link>
        </li>

        <!-- Cart -->
        <li class="nav-item">
          <div id="cart">
            <span id="nav-cart-count">{{ cartCount }}</span>
            <router-link class="text-light" :to="{ name: 'Cart' }">
              <i class="fa fa-shopping-cart" style="font-size:36px"></i>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import swal from 'sweetalert';
export default {
  name: "AppNavbar",
  props: {
    cartCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    token() {
      return localStorage.getItem("token");
    }
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.$emit("resetCartCount");
      this.$router.push({ name: "Home" });
      swal({
        text: "Logged you out. Visit Again",
        icon: "success",
        closeOnClickOutside: false
      });
    }
  }
};
</script>

<style scoped>
#logo {
  width: 150px;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-link {
  color: rgba(255, 255, 255);
}

#search-button-navbar {
  background-color: #febd69;
  border-color: #febd69;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}

#nav-cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  font-size: 15px;
  margin-left: 10px;
}

#cart {
  position: relative;
}
</style>
