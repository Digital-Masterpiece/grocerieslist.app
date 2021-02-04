import {shallowMount} from '@vue/test-utils'
import NewItemForm from '@/components/NewItemForm'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const factory = () => {
    return shallowMount(NewItemForm, {
        components: {
            'font-awesome-icon': FontAwesomeIcon
        }
    });
}

describe('New Item Form', () => {
    it('Renders Properly', () => {
        const wrapper = factory()
        expect(wrapper).toMatchSnapshot()
    })
})