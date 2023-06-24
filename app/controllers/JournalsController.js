import { AppState } from "../AppState.js";
import { journalsService } from "../services/JournalsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

let intervalId = null

function _setAutoSave() {
  if (!intervalId) {
    intervalId = setInterval(_save, 1000)
  }
}

function _save() {
  let newNotes = document.getElementById('journalText').value
  journalsService.saveJournals(newNotes)
  setText(`${AppState.activeJournal.id}Count`, AppState.activeJournal.count)
  console.log('Saved');
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

function focusText() {
  let textElement = document.getElementById('journalText')
  textElement.focus()
  textElement.setSelectionRange(textElement.value.length, textElement.value.length)
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
    setTimeout(focusText, 400)
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
    journalsService.deleteJournal(journalId)
  }


  reset() {
    journalsService.reset()
    clearInterval(intervalId)
  }
}