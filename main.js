const mainContainer = document.querySelector(".all-notes");
const addNoteButton = document.querySelector(".add-note");
const baseNotesURL = 'http://localhost:3000/notes/';
// ---------------------------------------------------------------

showAllNotes();

window.addEventListener('submit', e => {
    e.preventDefault();
})





// --------------------------------
function postNote() {
    const noteTitle = document.querySelector(".new-note-title").value;
    const noteBody = document.querySelector(".new-note-input").value;

    if (noteTitle.value !== "" || noteBody.value !== "") {
        fetch (baseNotesURL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: noteTitle,
                body: noteBody
            })})
            .then(res => res.json())
            .then(data => {
                renderNote(data)
            })
        }
}



function delNote(note) {
    const noteID = note.parentElement.id;
    fetch (baseNotesURL+noteID, {method: 'DELETE'})
        .then(() => {
            note.parentElement.remove();
        })
}



function showAllNotes() {
    fetch (baseNotesURL)
        .then(res => res.json())
        .then(data => {
            for (let d of data) {
                renderNote(d)
            }
            console.log('notes: ', data.length)
        })
}

function renderNote(note) {
    const listDiv = document.createElement("div");
    listDiv.className = "note"
    listDiv.id = note.id;
    const delButton = document.createElement("button");
    delButton.className = "delete-note-button";
    delButton.innerHTML = "Delete Note"
    const title = document.createElement("p")
    title.innerHTML = note.title;
    const noteBody = document.createElement('p');
    noteBody.innerHTML = note.body;

    listDiv.appendChild(title);
    listDiv.appendChild(noteBody);
    listDiv.appendChild(delButton);

    mainContainer.appendChild(listDiv);
}