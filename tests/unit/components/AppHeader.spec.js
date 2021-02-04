import {shallowMount,} from '@vue/test-utils'
import AppHeader from '@/components/AppHeader'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const factory = () => {
    return shallowMount(AppHeader, {
        stubs: [
            FontAwesomeIcon,
            'router-link'
        ]
    });
}

describe('New Item Form', () => {
    it('Renders Properly', () => {
        const wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
})