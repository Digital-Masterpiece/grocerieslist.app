import { v4 as uuidv4 } from 'uuid'

export default class Item {
  constructor (name, quantity) {
    this.id = uuidv4().substring(0, 8)
    // Name
    this.n = name
    // Quantity
    this.q = quantity
    // Checked
    this.c = 0
    // Updated
    this.u = new Date().getTime()
    // Deleted
    this.d = 0
  }
}
