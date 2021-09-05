import { v4 as uuidv4 } from 'uuid'

export default class Item {
  constructor (name, quantity) {
    // Created and updated timestamps default to creation time.
    const now = new Date().getTime()

    this.id = uuidv4()
    this.name = name
    this.quantity = quantity
    this.checked = false
    this.created = now
    this.updated = now
    this.deleted = null
  }
}
