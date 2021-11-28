<template>
    <div class="container-fluid">
        <div class="row mb-3">
            <div class="col">
                 <h5 class="mb-5">
                    HR Admin Dashboard
                </h5>

            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <input type="text" class="search float-left" placeholder="search...">
                
                <select name="filter-status" class="filter-status float-left ml-3" id="">
                    <option value="All">Status All</option>
                    <option value="Approve">Status Approve</option>
                    <option value="Pending">Status Pending</option>
                    <option value="Reject">Status Reject</option>
                </select>

    
                 <button type="button" class="btn btn-success float-right"> <b-icon icon="file-earmark-plus" scale="1.2" variant="white"></b-icon>  New Event</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                 <Table/>
            </div>
        </div>
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
};
</script>

<style scoped>
    .container-fluid {
        padding: 50px;
    }

    .search {
        width: 200px;
        border-top: unset;
        border-left: unset;
        border-right: unset;
        border-bottom: 1px solid rgb(184, 182, 182);
        height: 40px;
        color: rgb(116, 116, 116);
    }

    .search:focus {
        outline: none !important;
        border-bottom: 1.5px solid #1bc28a;
    }

    .filter-status {
        border-top: unset;
        border-left: unset;
        border-right: unset;
        width: 150px;
        height: 40px;
        font-size: 14px;
        color: rgb(116, 116, 116);
        border-bottom: 1px solid rgb(184, 182, 182);
    }

    .filter-status:focus {
        outline: none !important;
        border-bottom: 1.5px solid #1bc28a;
    }
</style>
