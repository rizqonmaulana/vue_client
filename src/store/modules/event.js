import axios from 'axios'

export default {
  state: {
      events: [],
      vendors: [],
      pagination: {}
  },
  mutations: {
    setEvents(state, events) {
        state.events = events
    },
    setVendors(state, vendors) {
        state.vendors = vendors
    },
    setPagination(state, paginate) {
      state.pagination = paginate
    }
  },
  actions: {
    getAllEvent(context, payload) {
      let query = `/api/embreo/event?id=${payload.idUser}&search=${payload.search}&role=${payload.role}&filter=${payload.filter}&page=${payload.page}&limit=${payload.limit}`
        axios.get('http://localhost:3000' + query)
        .then(response => {
            context.commit('setEvents', response.data.data)
            context.commit('setPagination', response.data.pagination)
        })
        .catch(error => {
            console.log('ini error', error)
        })
    },
    getAllVendor(context) {
      axios.get('http://localhost:3000/api/embreo/user/vendor')
      .then(response => {
        context.commit('setVendors', response.data.data)
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    createEvent(context, payload) {
      axios.post('http://localhost:3000/api/embreo/event/create', payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    updateEvent(context, payload) {
      axios.put(`http://localhost:3000/api/embreo/event/update/${payload.id}`, payload)
      .then(response => {
        console.log('response dari update event', response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    updateEventStatus(context, payload) {
      axios.put(`http://localhost:3000/api/embreo/event/update_status/${payload.id}`, payload)
      .then(response => {
        console.log('response dari update event status', response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    deleteEvent(context, payload) {
      axios.delete(`http://localhost:3000/api/embreo/event/delete/${payload.id}`)
      .then(response => {
        console.log('response dari delete event', response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    }
  },
  getters: {
    getEvents(state) {
        return state.events
    },
    getVendors(state) {
        return state.vendors
    },
    getPagination(state) {
      return state.pagination
    }
  },
}