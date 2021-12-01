<template>
    <div>
        <Table 
            :title="title"
            :tableRow="tableRow" 
            :eventItems="eventItems"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import Table from "../components/Table.vue"

export default {
    name: 'HRAdminDashboard',
    components: {
        Table
    },
    data() {
        return {
            title: "HR Admin Dashboard",
            tableRow: [
                'Event Name',
                'Vendor Name',
                'Confirmed Date',
                'Status',
                'Date Created'
            ]
        }
    }
};
</script>