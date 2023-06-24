import { AppState } from "../AppState.js"
import { Journal } from "../models/Journal.js";
import { Pop } from "../utils/Pop.js";
import { saveState } from "../utils/Store.js";


function _saveJournals() {
  saveState('journals', AppState.journals)
}

function _saveActiveJournal() {
  if (!AppState.activeJournal) {
    return
  }
  let activeJournalIndex = AppState.journals.findIndex(j => j.name == AppState.activeJournal.name)
  saveState('activeJournal', activeJournalIndex)
}

class JournalsService {
  constructor() {
    AppState.on('journals', _saveJournals)
    AppState.on('activeJournal', _saveActiveJournal)
  }
  setActiveJournal(journalId) {
    let foundJournal = AppState.journals.find(j => j.id == journalId)
    AppState.activeJournal = foundJournal
  }

  createJournal(form) {
    let newJournal = new Journal(form)
    AppState.journals.push(newJournal)
    AppState.activeJournal = newJournal
    AppState.emit('journals')
  }

  saveJournals(newNotes) {
    let journal = AppState.activeJournal
    if (newNotes == journal.notes) {
      return
    }
    journal.notes = newNotes
    journal.updatedDate = new Date().toLocaleString()
    AppState.emit('journals')
  }

  deleteJournal(journalId) {
    let journals = AppState.journals
    let journalIndex = journals.findIndex(j => j.id == journalId)
    journals.splice(journalIndex, 1)
    Pop.success(`${AppState.activeJournal.name} Was Deleted`)
    AppState.activeJournal = null
    AppState.emit('journals')
  }

  reset() {
    AppState.activeJournal = null
  }
}

export const journalsService = new JournalsService()