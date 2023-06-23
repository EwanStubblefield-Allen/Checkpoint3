export const JournalView = `
<!-- SECTION OffCanvas -->
<div class="offcanvas offcanvas-start bg-dark" tabindex="-1" id="offcanvasExample"
  aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">JOTS: <span id="jots">5</span></h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body ps-5">
    <div id="journalList">
    
    </div>
    <form onsubmit="app.JournalsController.createJournal(event)" class="d-flex align-items-center fs-2">
      <input type="text" minlength="3" maxlength="15" class="form-text" placeholder="Create Note" name="name" required>
      <input type="color" class="mx-2" name="color" required>
      <button type="submit" class="btn btn-light">
        <i class="mdi mdi-plus"></i>
      </button>
    </form>
  </div>
</div>

<section id="activeJournal" class="row justify-content-center py-3">

</section>`