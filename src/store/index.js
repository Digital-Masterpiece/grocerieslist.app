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
        }
    },
    modules: {}
})
