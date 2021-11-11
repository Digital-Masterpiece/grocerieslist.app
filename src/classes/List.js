import { v4 as uuidv4 } from 'uuid'

export default class List {
  constructor (name, items) {
    this.id = uuidv4()
    this.n = name
    this.i = items
  }
}
