// Study Room button handler (placeholder)
const studyRoomBtn = document.getElementById('study-room-btn');
if (studyRoomBtn) {
  studyRoomBtn.addEventListener('click', () => {
    alert('Study Room feature coming soon!');
  });
}
// Modal logic for New Class
const newClassBtn = document.getElementById('new-class-btn');
const classModal = document.getElementById('class-modal');
const classForm = document.getElementById('class-form');
const closeClassModalBtn = document.getElementById('close-class-modal-btn');
const modalClassInput = document.getElementById('modal-class');

function openClassModal() {
  classModal.style.display = 'flex';
  modalClassInput.value = '';
  modalClassInput.focus();
}
function closeClassModal() {
  classModal.style.display = 'none';
}
if (newClassBtn && classModal && classForm && closeClassModalBtn) {
  newClassBtn.addEventListener('click', openClassModal);
  closeClassModalBtn.addEventListener('click', closeClassModal);
  classModal.addEventListener('click', (e) => {
    if (e.target === classModal) closeClassModal();
  });
  classForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const className = modalClassInput.value.trim();
    if (!className) return;
    // Check if folder already exists
    let exists = Array.from(document.querySelectorAll('.folder-name')).some(f => f.textContent.trim().toLowerCase() === className.toLowerCase());
    if (!exists) {
      const folderGrid = document.querySelector('.folder-grid');
      const folder = document.createElement('div');
      folder.className = 'folder';
      folder.innerHTML = `<span class="folder-icon">📁</span> <span class="folder-name"></span><div class="card-grid collapsed"></div>`;
      folder.querySelector('.folder-name').textContent = className;
      folderGrid.appendChild(folder);
      // Add click handler for expand/collapse
      const notes = folder.querySelector('.card-grid');
      notes.classList.add('collapsed');
      folder.addEventListener('click', (e) => {
        if (e.target.closest('.card-grid')) return;
        document.querySelectorAll('.folder').forEach(f => {
          const n = f.querySelector('.card-grid');
          if (n && n !== notes) n.classList.add('collapsed');
          f.classList.remove('expanded');
        });
        notes.classList.toggle('collapsed');
        folder.classList.toggle('expanded', !notes.classList.contains('collapsed'));
      });
    }
    closeClassModal();
  });
}
// Modal logic for New Note
const newNoteBtn = document.getElementById('new-note-btn');
const noteModal = document.getElementById('note-modal');
const noteForm = document.getElementById('note-form');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalFolderInput = document.getElementById('modal-folder');
const modalNoteInput = document.getElementById('modal-note');

function openNoteModal() {
  noteModal.style.display = 'flex';
  modalFolderInput.value = '';
  modalNoteInput.value = '';
  modalFolderInput.focus();
}
function closeNoteModal() {
  noteModal.style.display = 'none';
}
if (newNoteBtn && noteModal && noteForm && closeModalBtn) {
  newNoteBtn.addEventListener('click', openNoteModal);
  closeModalBtn.addEventListener('click', closeNoteModal);
  noteModal.addEventListener('click', (e) => {
    if (e.target === noteModal) closeNoteModal();
  });
  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const folderName = modalFolderInput.value.trim();
    const noteName = modalNoteInput.value.trim();
    if (!folderName || !noteName) return;

    // Find the folder (case-insensitive)
    let folder = Array.from(document.querySelectorAll('.folder')).find(f => {
      const name = f.querySelector('.folder-name');
      return name && name.textContent.trim().toLowerCase() === folderName.toLowerCase();
    });

    // If folder doesn't exist, create it
    if (!folder) {
      const folderGrid = document.querySelector('.folder-grid');
      folder = document.createElement('div');
      folder.className = 'folder';
      folder.innerHTML = `<span class="folder-icon">📁</span> <span class="folder-name"></span><div class="card-grid collapsed"></div>`;
      folder.querySelector('.folder-name').textContent = folderName;
      folderGrid.appendChild(folder);

      // Add click handler for expand/collapse (same logic as above)
      const notes = folder.querySelector('.card-grid');
      notes.classList.add('collapsed');
      folder.addEventListener('click', (e) => {
        if (e.target.closest('.card-grid')) return;
        document.querySelectorAll('.folder').forEach(f => {
          const n = f.querySelector('.card-grid');
          if (n && n !== notes) n.classList.add('collapsed');
          f.classList.remove('expanded');
        });
        notes.classList.toggle('collapsed');
        folder.classList.toggle('expanded', !notes.classList.contains('collapsed'));
      });
    }

    // Add the note to the folder
    const cardGrid = folder.querySelector('.card-grid');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<p class=\"tag\">${folderName.toUpperCase()}</p><h3>${noteName}</h3><p class=\"meta\">just now</p>`;
    cardGrid.appendChild(card);
    // Expand the folder to show the new note
    document.querySelectorAll('.folder').forEach(f => {
      const n = f.querySelector('.card-grid');
      if (n && n !== cardGrid) n.classList.add('collapsed');
      f.classList.remove('expanded');
    });
    cardGrid.classList.remove('collapsed');
    folder.classList.add('expanded');
    closeNoteModal();

    // Redirect to blank note page with folder and note name
    setTimeout(() => {
      window.location.href = `note.html?folder=${encodeURIComponent(folderName)}&note=${encodeURIComponent(noteName)}`;
    }, 200);
  });
}
// Folder click to toggle notes visibility (only one open at a time)
const folders = document.querySelectorAll('.folder');
folders.forEach(folder => {
  const notes = folder.querySelector('.card-grid');
  if (notes) {
    notes.classList.add('collapsed');
    folder.addEventListener('click', (e) => {
      if (e.target.closest('.card-grid')) return;
      // Collapse all other folders and remove 'expanded'
      folders.forEach(f => {
        const n = f.querySelector('.card-grid');
        if (n && n !== notes) n.classList.add('collapsed');
        f.classList.remove('expanded');
      });
      // Toggle this one
      notes.classList.toggle('collapsed');
      folder.classList.toggle('expanded', !notes.classList.contains('collapsed'));
    });
  }
});
// ...existing code...

// Hero CTA button interaction
const getStartedBtn = document.getElementById('get-started-btn');
if (getStartedBtn) {
  getStartedBtn.addEventListener('click', () => {
    window.location.href = 'classes.html';
  });
}

// Subtle card hover effect (optional, for demo)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 32px #3b82f633';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});