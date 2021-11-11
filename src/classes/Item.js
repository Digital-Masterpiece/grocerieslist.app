import { v4 as uuidv4 } from 'uuid'

export default class Item {
  constructor (name, quantity) {
    this.id = uuidv4()
    // Name
    this.n = name
    // Quantity
    this.q = quantity
    // Checked
    this.c = false
    // Updated
    this.u = new Date().getTime()
    // Deleted
    this.d = null
  }
}
