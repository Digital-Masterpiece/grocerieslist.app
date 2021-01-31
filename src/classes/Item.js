export default class Item {
    constructor(name: string, quantity: number, cost: number, checked: boolean, url: string) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
        this.checked = checked;
        this.url = url;
    }
}