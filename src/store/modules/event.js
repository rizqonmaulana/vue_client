import axios from 'axios'

export default {
  state: {
      events: [],
      vendors: []
  },
  mutations: {
    setEvents(state, events) {
        state.events = events
    },
    setVendors(state, vendors) {
        state.vendors = vendors
    }
  },
  actions: {
    getAllEvent(context, payload) {
      let query = `/api/embreo/event?id=${payload.idUser}&search=${payload.search}&role=${payload.role}&filter=${payload.filter}&page=${payload.page}&limit=${payload.limit}`
        axios.get('http://localhost:3000' + query)
        .then(response => {
            context.commit('setEvents', response.data.data)
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
      const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJocjEiLCJlbWFpbCI6ImhyMUBnbWFpbC5jb20iLCJpbnN0aXR1dGlvbk5hbWUiOiJCaWcgR3JvdXAiLCJyb2xlIjoiSFIiLCJpYXQiOjE2MzgyOTMwNDUsImV4cCI6MTYzODM3OTQ0NX0.irYzgO3kUlZtQTOR1SeNWs36mneAnyOjc7pXX7BVzIk` }
      }
      axios.post('http://localhost:3000/api/embreo/event/create', payload, config)
      .then(response => {
        console.log('response dari create event', response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    updateEvent(context, payload) {
      const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJocjEiLCJlbWFpbCI6ImhyMUBnbWFpbC5jb20iLCJpbnN0aXR1dGlvbk5hbWUiOiJCaWcgR3JvdXAiLCJyb2xlIjoiSFIiLCJpYXQiOjE2MzgyOTMwNDUsImV4cCI6MTYzODM3OTQ0NX0.irYzgO3kUlZtQTOR1SeNWs36mneAnyOjc7pXX7BVzIk` }
      }
      axios.put(`http://localhost:3000/api/embreo/event/update/${payload.id}`, payload, config)
      .then(response => {
        console.log('response dari update event', response);
      })
      .catch(error => {
        console.log('ini error', error)
      })
    },
    deleteEvent(context, payload) {
      const config = {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJocjEiLCJlbWFpbCI6ImhyMUBnbWFpbC5jb20iLCJpbnN0aXR1dGlvbk5hbWUiOiJCaWcgR3JvdXAiLCJyb2xlIjoiSFIiLCJpYXQiOjE2MzgyOTMwNDUsImV4cCI6MTYzODM3OTQ0NX0.irYzgO3kUlZtQTOR1SeNWs36mneAnyOjc7pXX7BVzIk` }
      }
      axios.delete(`http://localhost:3000/api/embreo/event/delete/${payload.id}`, config)
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
    }
  },
}