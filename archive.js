

let listContainerEl = document.getElementById('list-container');
let MainNoteList = document.getElementById('note-item')




function createAndAppend(note) {

    let {
        title,
        content,
        _id
    } = note;

    let noteListEl = document.createElement('li');
    noteListEl.classList.add('list-item')


    let noteListTopEl = document.createElement('div');
    noteListTopEl.classList.add('top-container-style')
    noteListEl.appendChild(noteListTopEl);

    let noteHeading = document.createElement('h1');
    noteHeading.textContent = title;
    noteHeading.classList.add('note-heading')

    let archive = document.createElement('i');
    archive.className = "fa-duotone fa-solid fa-2x fa-arrow-rotate-left"
    archive.onclick = () => {
        console.log('archive clicked')
        console.log(_id)
        const archiveMoveUrl = `http://localhost:3040/notes/${_id}/archive/restore`;
        const archiveMoveOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(archiveMoveUrl, archiveMoveOptions)
            .then(function (response) {
                return response.json();
            })
            .then(async (jsonData) => {
                console.log(jsonData);
                window.location.reload()
            });
    }

    // let trash = document.createElement('i');
    // trash.className = 'fa-solid fa-2x fa-trash';

    noteListTopEl.appendChild(noteHeading);
    noteListTopEl.appendChild(archive);
    // noteListTopEl.appendChild(trash);

    let noteParaEl = document.createElement('p');
    noteParaEl.classList.add('note-para');
    noteParaEl.textContent = content;
    noteListEl.appendChild(noteParaEl);

    MainNoteList.appendChild(noteListEl);


}

function displayNoteItems(data) {
    for (let note of data) {
        createAndAppend(note);
    }
}

function main() {


    fetch('http://localhost:3040/notes/archive')

        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            console.log(jsonData);
            displayNoteItems(jsonData)
        });
}

main()

document.getElementById('keep').onclick = () => {
     window.location.href = 'index.html'
}