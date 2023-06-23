import { JournalsController } from "./controllers/JournalsController.js";
import { JournalView } from "./views/JournalView.js";


export const router = [
  {
    path: '',
    controller: JournalsController,
    view: JournalView
  }
]