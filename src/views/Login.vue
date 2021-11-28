<template>
  <div>
    <div class="container fluid">
      <div class="row">
        <div class="col col-lg-6 col-md-12 col-sm-12 col-12">
          <LoginForm />
        </div>
        <div class="col col-lg-6 col-md-0 col-sm-0 col-0">
          <img
            class="auth-img animate__animated animate__fadeInRight"
            src="../assets/login-img.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import LoginForm from "../components/Login/LoginForm.vue"

export default {
    name: 'Login',
    components: {
        LoginForm
    }
};
</script>

<style scoped>
* {
  overflow: hidden;
}

.col,
.col-lg-6,
.col-md-6,
.col-sm-0,
.col-0 {
  padding: unset;
}
.auth-img {
  width: 100%;
  height: 90vh;
  min-height: 620px;
  margin-top: 20px;
}
</style>

