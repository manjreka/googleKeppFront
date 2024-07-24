

let listContainerEl = document.getElementById('list-container');
let MainNoteList = document.getElementById('note-item')




function createAndAppend(note) {

    let {
        title,
        content,
        _id, deletedAt

    } = note;

    // deletedAt gives info when item was moved to trash


    let readDelDate = new Date (deletedAt)
    console.log(readDelDate)

    //delete item automatically after 30 days 

    let newDate = new Date (readDelDate.getFullYear(), readDelDate.getMonth(), readDelDate.getDate() + 30 )

    console.log(newDate)

    let today = new Date()

    if (newDate === today) {

        const deleteURL = `http://localhost:3040/notes/${_id}/permanent`;
        const deleteOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(deleteURL, deleteOptions)
            .then(function(){
                window.location.reload()
            })

    }


    

    let noteListEl = document.createElement('li');
    noteListEl.classList.add('list-item')


    let noteListTopEl = document.createElement('div');
    noteListTopEl.classList.add('top-container-style')
    noteListEl.appendChild(noteListTopEl);

    let noteHeading = document.createElement('h1');
    noteHeading.textContent = title;
    noteHeading.classList.add('note-heading')



    let trash = document.createElement('i');
    trash.className = "fa-solid fa-trash-can-arrow-up"

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

    let deletePer = document.createElement('i');
  
    deletePer.className = "fa-solid fa-ban"

    deletePer.onclick = () => {

        const deleteURL = `http://localhost:3040/notes/${_id}/permanent`;
        const deleteOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(deleteURL, deleteOptions)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
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

function main(){
    fetch('http://localhost:3040/get/trashed/notes')

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