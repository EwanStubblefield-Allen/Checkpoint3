import { generateId } from "../utils/generateId.js"

export class Journal {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.color = data.color
    this.createdDate = data.createdDate ? new Date(data.createdDate).toLocaleString() : new Date().toLocaleString()
    this.updatedDate = data.updatedDate ? new Date(data.updatedDate).toLocaleString() : new Date().toLocaleString()
    this.notes = data.notes ? data.notes : ''
  }

  get journalListTemplate() {
    return /*HTML*/`
    <div onclick="app.JournalsController.setActiveJournal('${this.id}')" class="text-start selectable">
      <div id="${this.id}Close" class="d-flex align-items-center" data-bs-dismiss="offcanvas">
        <p class="fs-2">${this.name}</p>
        <i class="mdi mdi-circle-outline p-3" style="color: ${this.color};"></i>
      </div>
    </div>`
  }

  get activeJournalTemplate() {
    return /*HTML*/`
    <div class="col-10 journal-bg" style="border: 3px solid ${this.color};">
      <section class="row">
        <div class="col-4 p-4">
          <div class="d-flex align-items-center">
            <p class="fs-1">${this.name}</p>
            <i class="mdi mdi-circle-outline p-3" style="color: ${this.color};"></i>
          </div>
          <div class="text-start py-3">
            <p>Created At: ${this.createdDate}</p>
            <p class="py-3">Last Update: ${this.updatedDate}</p>
            <p id="${this.id}Count">Words: ${this.wordCount}, Characters: ${this.notes.length}</p>
          </div>
        </div>
        <div class="col-7 p-5 text-center">
          <textarea onblur="app.JournalsController.saveJournals()" id="journalText" cols="80" rows="15" name="notes">${this.notes}</textarea>
        </div>
        <div class="col-1">
          <i onclick="app.JournalsController.deleteJournal('${this.id}')" class="mdi mdi-delete-circle fs-1 trash selectable"></i>
        </div>
      </section>
    </div>`
  }

  get wordCount() {
    if (this.notes == '') {
      return 0
    }
    let words = this.notes.split(' ').length
    return words
  }

  get count() {
    return `Words: ${this.wordCount}, Characters: ${this.notes.length}`
  }

  // STUB Time since last updated
  // get formattedDate() {
  //   let seconds = new Date().getSeconds() - this.updatedDate
  //   let minutes = Math.floor(seconds / 60) % 60
  //   let hours = Math.floor(seconds / 360)
  //   // return milliSecond
  //   return `${hours}:${this.addZero(minutes)}:${this.addZero(seconds)}`
  // }

  // addZero(num) {
  //   if (num < 10) {
  //     return 0 + num.toString()
  //   }
  // }
}