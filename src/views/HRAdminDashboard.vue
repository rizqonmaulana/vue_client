<template>
  <div>
    <Table :title="title" :tableRow="tableRow" />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '../components/Table.vue'
import store from '../store'

export default {
  name: 'HRAdminDashboard',
  components: {
    Table
  },
  data() {
    return {
      title: 'HR Admin Dashboard',
      tableRow: [
        'Event Name',
        'Vendor Name',
        'Confirmed Date',
        'Status',
        'Date Created'
      ]
    }
  },
  created() {
    const isAuthenticated = store.getters.isLogin
    const isHR = store.getters.isHR
    const isVendor = store.getters.isVendor
    if (!isAuthenticated && !isHR) {
      this.$router.push('/')
    } else if (isAuthenticated && isVendor) {
      this.$router.push('/vendor-admin-dashboard')
    }
  }
}
</script>
