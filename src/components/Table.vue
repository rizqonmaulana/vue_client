<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>
                 <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>
                        <button class="btn btn-primary"><b-icon icon="book" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-warning ml-2"><b-icon icon="pencil-square" scale="0.8" variant="white"></b-icon></button>
                        <button class="btn btn-danger ml-2"><b-icon icon="trash" scale="0.8" variant="white"></b-icon></button>
                    </td>
                </tr>                
            </tbody>
        </table>

        <b-pagination
              v-model="currentPage"
              :total-rows="20"
              :per-page="5"
              class="float-right"
            >
        </b-pagination>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
      }
    },
  }
</script>

<style scoped>
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #eafff8;
}
</style>