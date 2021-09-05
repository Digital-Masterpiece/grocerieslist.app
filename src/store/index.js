import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default createStore({
  state: {
    lists: []
  },
  getters: {
    getListFromId: (state) => (id) => state.lists.find(list => list.id === id)
  },
  mutations: {
    initListsFromLocalStorage (state) {
      if (localStorage.getItem('lists')) {
        state.lists = JSON.parse(localStorage.getItem('lists'))
      }
    },
    createList (state, list) {
      list.id = uuidv4()
      state.lists.push(list)
    },
    updateList (state, list) {
      state.lists[state.lists.findIndex(existingList => existingList.id === list.id)] = list
    },
    deleteList (state, id) {
      state.lists.splice(state.lists.findIndex(list => list.id === id), 1)
    },
    saveListsToMachine (state) {
      localStorage.setItem('lists', JSON.stringify(state.lists))
    }
  },
  actions: {
    init (context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('initListsFromLocalStorage')
          resolve()
        }, 0)
      })
    },
    createList (context, list) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('createList', list)
          context.commit('saveListsToMachine')
          resolve()
        }, 0)
      })
    },
    updateList (context, list) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('updateList', list)
          context.commit('saveListsToMachine')
          resolve()
        }, 0)
      })
    },
    deleteList (context, id) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('deleteList', id)
          context.commit('saveListsToMachine')
          resolve()
        }, 0)
      })
    }
  },
  modules: {}
})
