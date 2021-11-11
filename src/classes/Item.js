import { v4 as uuidv4 } from 'uuid'

export default class Item {
  constructor (name, quantity) {
    this.id = uuidv4()
    this.name = name
    this.quantity = quantity
    this.checked = false
    this.updated = new Date().getTime()
    this.deleted = null
  }
}
