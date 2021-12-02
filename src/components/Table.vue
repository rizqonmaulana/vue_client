<template>
  <div class="container-fluid">
    <div class="d-flex flex-row-reverse">
      <div>
        <button class="btn btn-danger float-right" @click="logout()">
          <b-icon icon="box-arrow-left" scale="0.8" variant="white"></b-icon>
          Logout
        </button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <h3 class="mb-5">
          {{ title }}
          <br />
          {{ user.institutionName }}
        </h3>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <input
          type="text"
          class="search float-left"
          placeholder="search..."
          v-model="payloadGetEvent.search"
          @keyup.enter="getAllEvent(payloadGetEvent)"
        />

        <select
          name="filter-status"
          class="filter-status float-left ml-3"
          v-model="payloadGetEvent.filter"
          @change="getAllEvent(payloadGetEvent)"
        >
          <option value="All">Status All</option>
          <option value="Approve">Status Approve</option>
          <option value="Pending">Status Pending</option>
          <option value="Reject">Status Reject</option>
        </select>

        <b-button
          v-if="user.role === 'HR'"
          @click="
            modalShow = !modalShow
            setModalTitle('Create event')
            setEventAndDateNull()
          "
          type="button"
          class="btn btn-success float-right"
          ><b-icon
            icon="file-earmark-plus"
            scale="1.2"
            variant="white"
          ></b-icon>
          New Event</b-button
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th v-for="(item, index) in tableRow" :key="index">
                {{ item }}
              </th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in eventItemsArr" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>
                {{
                  user.role === 'HR'
                    ? item.userVendor.institutionName
                    : item.userCompany.institutionName
                }}
              </td>
              <td v-if="item.confirmedDateId">
                {{ confirmedDate(item.eventDates, item.confirmedDateId) }}
              </td>
              <td v-else>-</td>
              <td v-if="item.status === 'Approve'" class="approve-status">
                {{ item.status }}
              </td>
              <td v-else-if="item.status === 'Reject'" class="reject-status">
                {{ item.status }}
              </td>
              <td v-else-if="item.status === 'Pending'" class="pending-status">
                {{ item.status }}
              </td>
              <td>{{ item.createdAt.slice(0, 10) }}</td>
              <td>
                <b-button
                  @click="
                    modalShow = !modalShow
                    setModalTitle('View event')
                    setEvent(item)
                  "
                  class="btn btn-success"
                  ><b-icon icon="book" scale="0.8" variant="white"></b-icon>
                  View</b-button
                >
                <b-button
                  @click="
                    modalShow = !modalShow
                    setModalTitle('Update event')
                    setEvent(item)
                  "
                  v-if="user.role === 'HR'"
                  class="btn btn-warning ml-2"
                  ><b-icon
                    icon="pencil-square"
                    scale="0.8"
                    variant="white"
                  ></b-icon>
                  Update</b-button
                >
                <b-button
                  v-if="user.role === 'HR'"
                  @click="
                    setEvent(item)
                    deleteEventHandler()
                  "
                  id="popover-button-sync"
                  class="btn btn-danger ml-2"
                  ><b-icon icon="trash" scale="0.8" variant="white"></b-icon>
                  Delete</b-button
                >
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
    </div>

    <b-modal
      v-model="modalShow"
      size="lg"
      :title="modalTitle"
      @change="modalTitleHandler"
      @ok="
        modalTitle === 'Create event'
          ? createEventHandler()
          : modalTitle === 'Update event'
          ? updateEventHandler()
          : updateEvenStatusHandler()
      "
    >
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="input-event-name">Event name</label>
          <input
            type="text"
            :disabled="modalTitle === 'View event' ? true : false"
            class="form-control"
            id="input-event-name"
            v-model="event.name"
          />
        </div>
        <div v-if="user.role === 'HR'" class="form-group col-md-6">
          <label for="inputState">Vendor name</label>
          <select
            v-if="modalTitle === 'Create event'"
            v-model="event.vendorUserId"
            id="inputState"
            class="form-control"
          >
            <option selected>Choose...</option>
            <option
              v-for="(item, index) in vendorsArr"
              :key="index"
              :value="item.id"
            >
              {{ item.institutionName }}
            </option>
          </select>

          <select
            v-else
            id="inputState"
            class="form-control"
            :disabled="modalTitle === 'View event' ? true : false"
            v-model="event.vendorUserId"
          >
            <option
              v-for="(item, index) in vendorsArr"
              :key="index"
              :value="item.id"
              :selected="event.vendorUserId"
            >
              {{ item.institutionName }}
            </option>
          </select>
        </div>
        <div v-else class="form-group col-md-6">
          <label for="inputState">Company name</label>
          <input
            type="text"
            class="form-control"
            :value="event.userCompany && event.userCompany.institutionName"
            disabled
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">Location</label>
        <input
          type="text"
          :disabled="modalTitle === 'View event' ? true : false"
          class="form-control"
          id="inputAddress"
          v-model="event.locationText"
        />
      </div>
      <div
        class="form-row"
        v-if="event.status !== 'Approve' || modalTitle === 'Create event'"
      >
        <div class="col-md-4 mb-3">
          <label for="validationTooltip01">Proposed date 1</label>
          <input
            type="date"
            :disabled="modalTitle === 'View event' ? true : false"
            class="form-control"
            id="validationTooltip01"
            v-model="dateOne"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationTooltip02">Proposed date 2</label>
          <input
            type="date"
            :disabled="modalTitle === 'View event' ? true : false"
            class="form-control"
            id="validationTooltip02"
            v-model="dateTwo"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationTooltip02">Proposed date 3</label>
          <input
            type="date"
            :disabled="modalTitle === 'View event' ? true : false"
            class="form-control"
            id="validationTooltip02"
            v-model="dateThree"
            required
          />
        </div>
      </div>
      <div class="form-row" v-if="modalTitle === 'View event'">
        <div v-if="event.status === 'Approve'" class="col">
          <label>Confirmed date</label>
          <input
            type="date"
            class="form-control"
            v-model="confirmedDateApprove"
            disabled
          />
        </div>
        <div class="col">
          <label>Status</label>
          <input
            type="text"
            class="form-control"
            v-model="event.status"
            disabled
          />
        </div>
      </div>
      <div class="form-group" v-if="event.status === 'Reject'">
        <label for="exampleInputEmail1">Remarks</label>
        <input
          v-model="event.remarks"
          type="text"
          class="form-control"
          disabled
        />
      </div>

      <div
        class="form-row mt-5 d-flex justify-content-center"
        v-if="user.role === 'vendor' && event.status === 'Pending'"
      >
        <button
          type="button"
          class="btn btn-success"
          @click="setUpdateStatus('Approve')"
        >
          Approve
        </button>
        <button
          type="button"
          class="btn btn-danger ml-5"
          @click="setUpdateStatus('Reject')"
        >
          Reject
        </button>
      </div>

      <div class="form-group" v-if="updateStatus !== ''">
        <div class="col">
          <label>{{
            updateStatus === 'Approve' ? 'Choose date' : 'Remarks'
          }}</label>

          <select
            v-if="updateStatus === 'Approve'"
            id="inputState"
            class="form-control"
            v-model="event.confirmedDateId"
          >
            <option
              v-for="(item, index) in event.eventDates"
              :key="index"
              :value="item.id"
            >
              {{ item.date.slice(0, 10) }}
            </option>
          </select>

          <input
            v-else-if="updateStatus === 'Reject'"
            v-model="event.remarks"
            type="text"
            class="form-control"
            placeholder="remarksss"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { alertMixin } from '../mixins/alertMixin'
import moment from 'moment'

export default {
  mixins: [alertMixin],
  props: ['title', 'tableRow', 'eventItems'],
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      modalShow: false,
      modalTitle: '',
      show: false,
      event: {
        name: '',
        locationText: '',
        confirmedDateId: '',
        status: '',
        remarks: '',
        createdAt: '',
        updatedAt: '',
        vendorUserId: '',
        vendorName: '',
        confirmedDate: '',
        eventDates: []
      },
      dateOne: '',
      dateTwo: '',
      dateThree: '',
      confirmedDateApprove: '',
      payloadGetEvent: {
        idUser: 1,
        search: '',
        role: 'HR',
        filter: 'All',
        page: 1,
        limit: 50
      },
      updateStatus: ''
    }
  },
  computed: {
    ...mapGetters({
      eventItemsArr: 'getEvents',
      vendorsArr: 'getVendors',
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions([
      'getAllEvent',
      'getAllVendor',
      'createEvent',
      'updateEvent',
      'updateEventStatus',
      'deleteEvent',
      'logout'
    ]),
    setModalTitle(title) {
      this.modalTitle = title
    },
    confirmedDate(date, dateId) {
      const dateObj = date.find((date) => date.id == dateId)
      const fixDate = dateObj.date.slice(0, 10)
      this.confirmedDateApprove = fixDate
      return fixDate
    },
    setEvent(event) {
      this.dateOne = this.formatTime(event.eventDates[0].date)
      this.dateTwo = this.formatTime(event.eventDates[1].date)
      this.dateThree = this.formatTime(event.eventDates[2].date)

      this.event = event
    },
    setEventAndDateNull() {
      ;(this.dateOne = ''), (this.dateTwo = ''), (this.dateThree = '')

      this.event = {}
    },
    modalTitleHandler() {
      if (this.modalShow == false) {
        this.modalTitle = ''
      }
    },
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD')
    },
    setUpdateStatus(status) {
      this.updateStatus = status
    },
    createEventHandler() {
      const payload = {
        name: this.event.name,
        locationText: this.event.locationText,
        companyUserId: 1,
        vendorUserId: this.event.vendorUserId,
        eventDates: [this.dateOne, this.dateTwo, this.dateThree]
      }

      this.createEvent(payload)
        .then(() => {
          this.successAlert('Success create event')
          this.getAllEvent(this.payloadGetEvent)
        })
        .catch((error) => {
          console.log(error)
          this.errorAlert('failed to create event :(')
        })
    },
    updateEventHandler() {
      const payload = {
        id: this.event.id,
        name: this.event.name,
        locationText: this.event.locationText,
        companyUserId: 1,
        vendorUserId: this.event.vendorUserId,
        eventDates: [
          {
            id: this.event.eventDates[0].id,
            date: this.dateOne
          },
          {
            id: this.event.eventDates[1].id,
            date: this.dateTwo
          },
          {
            id: this.event.eventDates[2].id,
            date: this.dateThree
          }
        ]
      }

      this.updateEvent(payload)
        .then(() => {
          this.successAlert('Success update event')
          this.getAllEvent(this.payloadGetEvent)
        })
        .catch((error) => {
          console.log(error)
          this.errorAlert('failed to update event :(')
        })
    },
    updateEvenStatusHandler() {
      const payload = {
        id: this.event.id,
        confirmedDateId: this.event.confirmedDateId,
        status: this.updateStatus,
        remarks: this.event.remarks
      }

      this.updateEventStatus(payload)
        .then(() => {
          this.successAlert('Success update event status')
          this.getAllEvent(this.payloadGetEvent)
          this.updateStatus = ''
        })
        .catch(() => {
          console.log('gagal simpan')
          this.errorAlert('failed to update event status :(')
        })
    },
    deleteEventHandler() {
      const payload = {
        id: this.event.id
      }

      this.deleteEvent(payload)
        .then(() => {
          this.successAlert('Success delete event')
          this.getAllEvent(this.payloadGetEvent)
        })
        .catch(() => {
          this.errorAlert('failed to update event :(')
        })
    }
  },
  created() {
    this.getAllEvent(this.payloadGetEvent).then((res) => {
      console.log(res)
    })
    this.getAllVendor().then((res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.table-hover tbody tr:hover td,
.table-hover tbody tr:hover th {
  background-color: #eafff8;
}

.btn {
  font-size: 14px;
  color: rgb(255, 255, 255);
}

.btn:hover {
  font-size: 14px;
  color: rgb(255, 255, 255);
}

.approve-status {
  color: #1bc28a;
  font-weight: bold;
}

.reject-status {
  color: #c21b1b;
  font-weight: bold;
}

.pending-status {
  color: #dbce12;
  font-weight: bold;
}

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
  background-color: unset;
  border-bottom: 1px solid rgb(184, 182, 182);
}

.filter-status:focus {
  outline: none !important;
  border-bottom: 1.5px solid #1bc28a;
}
</style>
