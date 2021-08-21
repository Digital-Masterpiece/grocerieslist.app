import {createStore} from 'vuex'
import {v4 as uuidv4} from 'uuid'

export default createStore({
    state: {
        lists: []
    },
    getters: {
        // https://vuex.vuejs.org/guide/getters.html#method-style-access Good luck future Nick.
        getListFromId: (state) => (id) => {
            return state.lists.find(list => list.id === id)
        }
    },
    mutations: {
        initListFromLocalStorage(state) {
            if (localStorage.getItem('lists')) {
                state.lists = JSON.parse(localStorage.getItem('lists'));
            }
            // Older versions of this application may not have an ID specified for each list.
            state.lists.forEach(list => {
                if (!list.id) {
                    list.id = uuidv4();
                }
            })
        },
        mutateList(state, list) {
            if (list.id) {
                let existingList = state.lists.find(existingList => existingList.id === list.id);
                // Check if the list is linked from another person and being updated/overridden.
                if (existingList) {
                    state.lists[state.lists.findIndex(existingList => existingList.id === list.id)] = list
                } else {
                    state.lists.push(list)
                }
            } else {
                list.id = uuidv4();
                state.lists.push(list)
            }
            localStorage.setItem('lists', JSON.stringify(state.lists))
        },
        removeList(state, id) {
            state.lists.splice(state.lists.findIndex(list => list.id === id), 1)
            localStorage.setItem('lists', JSON.stringify(state.lists))
        }
    },
    actions: {
        updateList(context, list) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('mutateList', list)
                    resolve()
                }, 1)
            })
        },
        deleteList(context, id) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('removeList', id)
                    resolve()
                }, 1)
            })
        }
    },
    modules: {}
})
