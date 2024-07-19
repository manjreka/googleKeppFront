

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

  

    let trash = document.createElement('i');
    trash.className = "fa-duotone fa-solid fa-2x fa-arrow-rotate-left"

    trash.onclick = () => {
        
        console.log(_id)
        const trashMoveUrl = `http://localhost:3040/notes/${_id}/trash/restore`
        const trashMoveOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(trashMoveUrl, trashMoveOptions)
            .then(function (response) {
                return response.json();
            })
            .then(async (jsonData) => {
                console.log(jsonData);
                window.location.reload()
            });
    }

    let deletePer = document.createElement('img');
    deletePer.src = 'https://res.cloudinary.com/dtzajnril/image/upload/v1721358837/deletePer_py93fd.png'
    deletePer.style.width = '35px'

    deletePer.onclick = () => {
        
        const deleteURL = `http://localhost:3040/notes/${_id}/permanent` ;
        const deleteOptions =  {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(deleteURL, deleteOptions)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                window.location.reload()
            })
    }


    noteListTopEl.appendChild(noteHeading);
    noteListTopEl.appendChild(trash);
    noteListTopEl.appendChild(deletePer)

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


    fetch('http://localhost:3040/notes/trash')

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