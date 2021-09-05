export default class Item {
  constructor (id, name, quantity, checked) {
    // Created and updated timestamps default to creation time.
    const now = new Date().getTime()

    this.id = id
    this.name = name
    this.quantity = quantity
    this.checked = checked
    this.created = now
    this.updated = now
    this.deleted = null
  }
}
