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
            title: "Vendor Admin Dashboard",
            tableRow: [
                'Event Name',
                'Company Name',
                'Confirmed Date',
                'Status',
                'Date Created'
            ]
        }
    }
};
</script>