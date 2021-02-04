import {shallowMount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import App from '@/App'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Application', () => {
    it('Renders Properly', () => {
        const wrapper = shallowMount(App, {
            localVue,
            router
        })
        expect(wrapper).toMatchSnapshot()
    })
})