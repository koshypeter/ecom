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

    <!-- Signup Form -->
    <div class="row">
      <div class="col-12 d-flex justify-content-center pt-5">
        <div id="signup-div" class="flex-item border p-4">
          <h2>Create Account</h2>
          <form @submit.prevent="signup">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>

            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" class="form-control" v-model="firstName" required />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" class="form-control" v-model="lastName" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" class="form-control" v-model="passwordConfirm" required />
            </div>

            <button type="submit" class="btn btn-primary mt-2 py-0">
              Create Account
            </button>
          </form>

          <hr />
          <small class="form-text text-muted text-center">Already Have an Account?</small>
          <p class="text-center">
            <router-link
              class="btn btn-dark mx-auto px-5 py-1 mb-2"
              :to="{ name: 'Signin' }"
            >
              Signin Here
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  props: {
    baseURL: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.passwordConfirm) {
        swal({
          text: "Error! Passwords are not matching",
          icon: "error",
          closeOnClickOutside: false,
        });
        return;
      }

      const user = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
      };

      try {
        await axios.post(`${this.baseURL}user/signup`, user);
        this.$router.replace({ name: "Signin" });
        swal({
          text: "User signup successful. Please Login",
          icon: "success",
          closeOnClickOutside: false,
        });
      } catch (err) {
        console.error(err);
        swal({
          text: "Signup failed. Try again later.",
          icon: "error",
          closeOnClickOutside: false,
        });
      }
    },
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
  #signup-div {
    width: 40%;
  }
}
</style>
