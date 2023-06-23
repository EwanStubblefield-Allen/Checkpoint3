import { AppState } from "../AppState.js";
import { journalsService } from "../services/JournalsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

let intervalId = null

function _setAutoSave() {
  clearInterval(intervalId)
  intervalId = setTimeout(_save, 10000)
}

function _save() {
  let newNotes = document.getElementById('journalText').value
  journalsService.saveJournals(newNotes)
}

function _drawJournals() {
  let journals = AppState.journals
  let template = ''
  journals.forEach(j => template += j.journalListTemplate)
  setHTML('journalList', template)
  setText('jots', journals.length)
}

function _drawActiveJournal() {
  if (!AppState.activeJournal) {
    setHTML('activeJournal', AppState.default)
    return
  }
  let journal = AppState.activeJournal.activeJournalTemplate
  setHTML('activeJournal', journal)
  _setAutoSave()
}

export class JournalsController {
  constructor() {
    console.log('Journals Controller Loaded');

    _drawJournals()
    _drawActiveJournal()

    AppState.on('journals', _drawJournals)
    AppState.on('activeJournal', _drawActiveJournal)
  }

  setActiveJournal(journalId) {
    journalsService.setActiveJournal(journalId)
    let textElement = document.getElementById('journalText')
    setTimeout(() => {
      textElement.focus()
      textElement.setSelectionRange(textElement.value.length, textElement.value.length)
    }, 400)
  }

  createJournal(event) {
    event.preventDefault()
    let form = event.target
    journalsService.createJournal(getFormData(form))
    document.getElementById(`${AppState.activeJournal.id}Close`).click()
    _drawJournals()
    form.reset()
  }

  saveJournals() {
    _save()
    AppState.emit('activeJournal')
  }

  async deleteJournal(journalId) {
    let isYes = await Pop.confirm('Are you sure you want to delete this journal?')
    if (!isYes) {
      return
    }
    console.log('delete journal?', journalId);
    journalsService.deleteJournal(journalId)
  }


  reset() {
    journalsService.reset()
    clearInterval(intervalId)
  }
}