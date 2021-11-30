<template>
  <div class="vendor-admin-dashboard">
   <h1>Vendor Admin Dashboard</h1>
   
  <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
   
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "VendorAdminDashboard",
    data() {
      return {
        modalShow: false
      }
    }
};
</script>
