<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to="/hr-admin-dashboard">pindah</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import store from "../store";
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
