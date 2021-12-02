<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <router-link to='/hr-admin-dashboard'>pindah</router-link>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import store from "../store";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  // created(){
  //   const lastRoute = localStorage.getItem("lastRoute");
  //   console.log("ini jalan", lastRoute);
  //   if (lastRoute == "Login") {
  //     if (store.getters.isHR) {
  //       console.log("user HR")
  //       setTimeout(() => {

  //         // this.$router.push("/hr-admin-dashboard");
  //       }, 1000);
  //     } else if (store.getters.isVendor) {
  //       console.log("user Vendor")
  //     // this.$router.push("/hr-admin-dashboard");
  //   }
  //   // const lastRoute = localStorage.getItem("lastRoute");
  //   // console.log("ini jalan", lastRoute);
  //   // console.log("before",this.$route);
  // }},
  // created: function(){
  //   if(store.getters.isLogin){
  //     console.log('isLogin');
  //     if (store.getters.getUser.role === "HR") {
  //       setTimeout(() => {
  //         this.$router.push("/hr-admin-dashboard");
  //       }, 1000);
  //     }
     
  //   }
  // }
  // }
};
</script>
