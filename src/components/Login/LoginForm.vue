<template>
  <div>
    <div class="form animate__animated animate__fadeInLeft">
      <div class="top">
        <div class="d-flex justify-content-between align-items-center">
          <div></div>
          <div>
            <router-link to="">
              <p class="signup-text mt-3">Sign Up</p></router-link
            >
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="text-grey text-center">Welcome Back!</p>
        <h4 class="text-black mt-3">Login your account</h4>
        <label class="text-grey mt-4"> Email </label>
        <br />
        <input
          type="text"
          class="text-black text-14"
          v-model="userLogin.username"
          autofocus
        />
        <br />
        <label class="text-grey mt-4"> Password </label>
        <br />
        <input
          type="password"
          v-model="userLogin.password"
          @keyup.enter="loginHandler()"
          class="text-black text-14"
        />

        <button class="btn-login mt-5" @click="loginHandler()">Login</button>
        <p class="text-black text-14 text-center mt-4">
          Don't have an account ?
          <router-link to="">sign up here</router-link>
        </p>
        <router-link to="">
          <p class="text-grey text-14 text-center mt-2">Forgot password ?</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../../store'
export default {
  data() {
    return {
      userLogin: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    const isAuthenticated = store.getters.isLogin
    const isHR = store.getters.isHR
    const isVendor = store.getters.isVendor
    if (isAuthenticated && isHR) {
      this.$router.push('/hr-admin-dashboard')
    } else if (isAuthenticated && isVendor) {
      this.$router.push('/vendor-admin-dashboard')
    }
  },
  methods: {
    ...mapActions(['login']),
    loginHandler() {
      this.login(this.userLogin)
        .then((res) => {
          const result = res.data.data.role
          if (result === 'HR') {
            this.$router.push('/hr-admin-dashboard')
          } else if (result === 'vendor') {
            this.$router.push('/vendor-admin-dashboard')
          }
        })
        .catch((err) => {
          console.log(err.data.message)
        })
    }
  }
}
</script>

<style scoped>
* {
  font-family: poppins;
}

.text-grey {
  color: #bab6b9;
}

.text-black {
  color: rgb(51, 51, 51);
}

.text-14 {
  font-size: 14px;
}

h4 {
  font-weight: 700;
}

.form {
  padding: 0px 100px;
}

input {
  border-top: unset;
  border-left: unset;
  border-right: unset;
  border-bottom: 1px solid #bab6b9;
  transition-duration: 0.6s;
  width: 100%;
}

input:focus {
  border-bottom: 1px solid #1bc28a;
  outline: unset;
}

.signup-text {
  color: #1bc28a;
  font-size: 18px;
  font-weight: 700;
}

.btn-login {
  background-color: #1bc28a;
  color: #fff;
  font-weight: 700;
  width: 100%;
  padding: 15px 0;
  outline: unset;
  transition-duration: 0.6s;
  border: unset;
  border-radius: 10px;
}

.btn-login:hover {
  background-color: #18a174;
}

.bottom {
  margin-top: 100px;
}

a {
  text-decoration: none !important;
}

.error {
  width: 100%;
  background-color: #ca3a3a;
  border-radius: 5px;
  padding: 0 5px;
}

.error p {
  font-size: 12px;
  color: #fff;
}

@media (max-width: 1200px) {
  .form {
    padding: 0px 100px;
  }
}

@media (max-width: 992px) {
  .form {
    padding: 0px 100px;
  }
}

@media (max-width: 768px) {
  .form {
    padding: 0px 80px;
  }
}

@media (max-width: 576px) {
  .form {
    padding: 0px 60px;
  }
}
</style>
