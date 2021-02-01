import {createStore} from 'vuex'

export default createStore({
    state: {
        lists: []
    },
    getters: {
        getList(state, index) {
            if (state.lists[index]) {
                return state.lists[index]
            } else {
                return null;
            }
        }
    },
    mutations: {
        initListFromLocalStorage(state) {
            if (localStorage.setItem('lists', state.lists)) {
                state.lists = JSON.parse(localStorage.getItem('lists'));
            }
        },
        mutateList(state, payload) {
            if (payload.index !== null) {
                state.lists[payload.index] = payload.list
            } else {
                state.lists.push(payload.list)
            }
            localStorage.setItem('lists', JSON.stringify(state.lists))
        },
        removeList(state, index) {
            state.lists.splice(index, 1)
            localStorage.setItem('lists', JSON.stringify(state.lists))
        }
    },
    actions: {
        createList(context, list) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('mutateList', {index: null, list: list})
                    resolve()
                }, 1)
            })
        },
        updateList(context, {index, list}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('mutateList', {index: index, list: list})
                    resolve()
                }, 1)
            })
        },
        deleteList(context, index) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('removeList', index)
                    resolve()
                }, 1)
            })
        }
    },
    modules: {}
})
