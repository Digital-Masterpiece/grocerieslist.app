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
        mutateList(state, payload) {
            if (payload.index !== null) {
                state.lists[payload.index] = payload.list
            } else {
                state.lists.push(payload.list)
            }
            localStorage.setItem('lists', JSON.stringify(state.lists))
            console.log(localStorage.getItem('lists'))
        },
        removeList(state, index) {
            state.lists.splice(index, 1)
            localStorage.setItem('lists', JSON.stringify(state.lists))
            console.log(localStorage.getItem('lists'))
        },
        initListFromLocalStorage(state) {
            state.lists = JSON.parse(localStorage.getItem('lists'));
        }
    },
    actions: {
        createList(context, list) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('mutateList', {index: null, list: list})
                    resolve()
                }, 100)
            })
        },
        updateList(context, {index, list}) {
            context.commit('mutateList', {index: index, list: list})
        },
        deleteList(context, index) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('removeList', index)
                    resolve()
                }, 100)
            })
        }
    },
    modules: {}
})
