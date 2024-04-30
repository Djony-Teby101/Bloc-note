
const notesWrapper = document.getElementById("notes-wrapper");
const title = document.getElementById("title");
const content = document.getElementById("content");
const form = document.getElementById("form")
const formError = document.getElementById("form-error");

// Create Array.
let notes = [];

// Check fields
function addNote() {
    if (title.value === "" || content.value === "") {
        formError.innerHTML = "Please fill in all fields";
        return;
    }

    // Take data front HTML fields.
    const note = {
        uid: Date.now(),
        title: title.value,
        content: content.value,
        date: new Date()
    };

    // push into notes dataset.
    notes.push(note);

    // CreateNote into view side.
    createNote(note.uid, note.title, note.content, note.date);


    // Reset input fields & Error handle notification.
    title.value = "";
    content.value = ""
    formError.innerHTML = "";

    saveNotes();
}

// Build CreateNote Function
function createNote(uid, title, content, date) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.id = uid;
    note.innerHTML = `
    <div class="note-title">${title}</div>
        <div class="note-controls">
            <button class="note-edit" onclick="editNote(${uid})">Edit</button>
            <button class="note-save" style="display: none;" onclick="saveNote(${uid})" >Save</button>
            <button class="note-delete" onclick="deleteNote(${uid})">Delete</button>
        </div>
    <div class="note-text">${content}</div>
    `;
    

    notesWrapper.appendChild(note);

}

// Build editNote Function.

function editNote(uid){
    const note=document.getElementById(uid);
    const title=note.querySelector(".note-title");
    const text=note.querySelector(".note-text");
    const controls=note.querySelector(".note-controls");
    const edit=controls.querySelector(".note-edit");
    const save=controls.querySelector(".note-save");
    const deleteBtn=controls.querySelector(".note-delete");



    // Manipulate Style
    edit.style.dislay="none";
    save.style.display="block";
    deleteBtn.style.display="none";

    // field editable.
    title.contentEditable="true";
    text.contentEditable="true";

    save.onclick=()=>{
        if(title.innerText==="" || text.innerText===""){
            formError.innerText='Please fill all fields !';
            return;
        }

        save.style.display="none";
        edit.style.display="block";
        deleteBtn.style.display="block";

        title.contentEditable="false";
        text.contentEditable="false";

        saveNote(uid, title.innerText, text.innerText);
    };

}
// Save data after edition.
function saveNote(uid, title, text){
    notes.forEach((note, index)=>{
        if(note.uid=== Number(uid)){
            notes[index]={...note,title,text}
        }
    });
    saveNotes();
}

function deleteNote(uid){
    const note=document.getElementById(uid);
    note.parentNode.removeChild(note);

    note=notes.filter((note)=>{
        note.uid != Number(uid)
    })
    saveNotes();
}


// Save into Localstorage.
function saveNotes(){
    localStorage.setItem("notes",JSON.stringify(notes))
}

// Load data from localstorage.
function loadNotes(){
    const saveNotes=localStorage.getItem("notes");
    if(saveNotes){
        notes=JSON.parse(saveNotes);

        notes.forEach(note=>{
            createNote(note.uid, note.title, note.text, note.date)
        })
    }
}

loadNotes();

