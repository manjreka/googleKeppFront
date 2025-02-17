

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
    archive.className = "fa-regular fa-folder-open"
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


    fetch('http://localhost:3040/get/archived/notes')

        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            console.log(jsonData);
            displayNoteItems(jsonData)
        });
}

main()


// document.getElementById('search').addEventListener('keydown', function (event) {
// event.preventDefault()
//     if (event.key === 'Enter') {
//         let userValue = event.target.value
//         console.log(userValue)

//         let serachUrl = `http://localhost:3040/get/notes/serach?title=${userValue}`

//         fetch(serachUrl)
//             .then(function (response) {
//                 return response.json()
//             })
//             .then(function (data) {
//                 console.log(data)
//                 displaySearchResult(data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

// })


document.getElementById('keep').onclick = () => {
     window.location.href = 'index.html'
}