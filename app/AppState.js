import { Journal } from "./models/Journal.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  default = `
    <div class="col-12">  
      <img src="assets/img/typewriter.png" alt="typewriter">
    </div>`

  /** @type {import('./models/Journal.js').Journal[]} */
  journals = loadState('journals', [Journal])

  /** @type {import('./models/Journal.js').Journal} */
  activeJournal = this.journals[loadState('activeJournal')]

  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
