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
            ],
             eventItems: [
                {
                    eventName: 'Covid 19 Talks',
                    vendorName: 'Big Group',
                    confirmedDate: null,
                    status: 'Pending',
                    dateCreated: '2020-04-01'
                },
                {
                    eventName: 'Mental Health Issues',
                    vendorName: 'Bee Group',
                    confirmedDate: null,
                    status: 'Pending',
                    dateCreated: '2020-05-02'
                },
                {
                    eventName: 'Vaccine Is Good for You Talk',
                    vendorName: 'Good Doctor',
                    confirmedDate: '2020-08-03',
                    status: 'Approve',
                    dateCreated: '2020-05-01'
                },
                {
                    eventName: 'Healthy Routine for Tech People',
                    vendorName: 'Geek Group',
                    confirmedDate: null,
                    status: 'Reject',
                    dateCreated: '2020-07-01'
                },
                {
                    eventName: 'Good Sleep for Productivity',
                    vendorName: 'Wind Group',
                    confirmedDate: '2020-09-14',
                    status: 'Approve',
                    dateCreated: '2020-08-22'
                }
            ],
            // currentPage: 1,
            // perPage: 5,
            // totalRows: 20,
        }
    }
};
</script>