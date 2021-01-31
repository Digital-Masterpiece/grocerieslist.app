import Item from "@/classes/Item";

export default class List {
    constructor(name: string, items: Array<Item>) {
        this.name = name;
        this.items = items;
    }
}