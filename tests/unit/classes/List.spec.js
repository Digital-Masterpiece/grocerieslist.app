import List from '@/classes/List'
import Item from '@/classes/Item'

it('Constructs properly.', () => {
    const items = [new Item('Test', 1, false)]
    const list = new List('Test', items);
    expect(list.name).toBe('Test')
    expect(list.items).toBe(items)
})
