<template>
  <div class="container">
    <!-- Logo -->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <img id="logo" src="../assets/icon.png" />
        </router-link>
      </div>
    </div>

    <!-- Sign-In Form -->
    <div class="row">
      <div class="col-12 d-flex justify-content-center pt-5">
        <div id="signin-div" class="flex-item border p-4">
          <h2>Sign-In</h2>
          <form @submit.prevent="signin">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>
            <small class="form-text text-muted">
              By continuing, you agree to Simple Comm's Conditions of Use and Privacy Notice.
            </small>
            <button type="submit" class="btn btn-primary mt-2 py-0">
              Continue
              <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>

          <hr />
          <small class="form-text text-muted text-center">New to Simple Comm?</small>
          <p class="text-center">
            <router-link
              :to="{ name: 'Signup' }"
              class="btn btn-dark mx-auto px-5 py-1 mb-2"
            >
              Create Your Simple Comm Account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import axios from 'axios';
export default {
  name: "SigninView",
  props: {
    baseURL: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async signin() {
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(`${this.baseURL}user/signIn`, user);
        localStorage.setItem("token", response.data.token);
        this.$emit("fetchData");
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.error(error);
        swal({
          text: "Unable to log you in!",
          icon: "error",
          closeOnClickOutside: false,
        });
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style scoped>
.btn-dark {
  background-color: #e7e9ec;
  color: #000;
  font-size: smaller;
  border-radius: 0;
  border-color: #adb1b8 #a2a6ac #a2a6ac;
}

.btn-primary {
  background-color: #f0c14b;
  color: black;
  border-color: #a88734 #9c7e31 #846a29;
  border-radius: 0;
}

#logo {
  width: 150px;
}

@media only screen and (min-width: 992px) {
  #signin-div {
    width: 40%;
  }
}
</style>
