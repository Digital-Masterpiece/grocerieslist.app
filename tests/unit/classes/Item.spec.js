import Item from '@/classes/Item'

it('Constructs properly.', () => {
    const item = new Item('Test', 1, false);
    expect(item.name).toBe('Test')
    expect(item.quantity).toBe(1)
    expect(item.checked).toBe(false)
})
