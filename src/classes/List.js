import { v4 as uuidv4 } from 'uuid'

export default class List {
  constructor (name, items) {
    this.id = uuidv4().substring(0, 8)
    // Name
    this.n = name
    // Items
    this.i = items
  }
}
