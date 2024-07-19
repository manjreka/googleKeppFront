const addButton = document.getElementById('add-button');
const noteContainer = document.getElementById('note');
const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
let formEl = document.getElementById('note-form');
let listContainerEl = document.getElementById('list-container');
let MainNoteList = document.getElementById('note-item')

let serachEl = document.getElementById('search')

let subCont = document.getElementById('sub-container')






let noteData = {
    title: '',
    content: ''
}

titleEl.addEventListener('change', function(event) {
    noteData.title = event.target.value;
});

contentEl.addEventListener('change', function(event) {
    noteData.content = event.target.value;
});


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

    let edit = document.createElement('img');
    edit.src = 'https://res.cloudinary.com/dtzajnril/image/upload/v1721358658/pen_ipz1xg.png'
    edit.style.width = '30px'


    let archive = document.createElement('i');
    archive.className = "fa-solid fa-2x fa-folder";
    archive.onclick = () => {
        console.log('archive clicked')
        console.log(_id)
        const archiveMoveUrl =  `http://localhost:3040/notes/${_id}/archive`
        const archiveMoveOptions = {
             method: "PATCH",
            headers: {
                 "Content-Type": "application/json"
            }
        }
        
        fetch(archiveMoveUrl, archiveMoveOptions)
            .then(function(response) {
                return response.json();
            })
            .then( (jsonData) => {
                console.log(jsonData);
                window.location.reload()
            });
    }

    let trash = document.createElement('i');
    trash.className = 'fa-solid fa-2x fa-trash';
    trash.onclick = () => {
        console.log('trash icon clicked!!')
        const trashMoveUrl = `http://localhost:3040/notes/trash/${_id}`;

        const trashMoveOptions = {
            method: "DELETE",
           headers: {
                "Content-Type": "application/json"
           }
       }

       fetch(trashMoveUrl, trashMoveOptions)
       .then(response =>{
        return response.json()
       })
       .then(jsonData => {
        console.log(jsonData)
        window.location.reload()
       })

    }

    noteListTopEl.appendChild(noteHeading);
    noteListTopEl.appendChild(archive);
    noteListTopEl.appendChild(trash);
    noteListTopEl.appendChild(edit)

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

let listUrl = 'http://localhost:3040/notes';

fetch(listUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        displayNoteItems(jsonData);
    });



function submitFormDetails() {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteData)
    };

    const url = 'http://localhost:3040/notes';

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(async (jsonData) => {
            console.log(jsonData)
            await createAndAppend(jsonData)
            alert('note created successfully!!');
           
        });

    

 
}

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    submitFormDetails();
    titleEl.value = ''
    contentEl.value = ''
})


function noSearchOutput(){

    const errEl = document.createElement('h1')
    errEl.textContent = 'No Match Found'
    errEl.classList.add('errEl')

    MainNoteList.appendChild(errEl)

}

function displaySearchResult(data){

    MainNoteList.textContent = ''
    if (data.length === 0) {
        noSearchOutput()
    }
    else{
        displayNoteItems(data)
    }

}


serachEl.addEventListener('keydown',  function(event){
    event.preventDefault()
    if (event.key === 'Enter'){
        let userValue = event.target.value
        console.log(userValue)

       

        let serachUrl = `http://localhost:3040/notes/search?title=${userValue}`

         fetch(serachUrl)
        .then(function (response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
           displaySearchResult(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
})



document.getElementById('three-line').onclick = () => {
    document.getElementById('dropdown').classList.toggle('side-bar')
}


document.getElementById('notes-list-back').onclick = () => {
    window.location.href = 'archive.html'
}

document.getElementById('trash-items').onclick = () => {
    window.location.href = 'trash.html'
}


