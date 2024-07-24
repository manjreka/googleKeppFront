const noteContainer = document.getElementById('note-file')
const titleEL = document.getElementById('title')
const contentEl = document.getElementById('content')
const reminderBox = document.getElementById('reminder-box')

let newNoteData = {}

// const styles = ["italic-style", "decoration-style", 'weight' ]

// styles.map(each => {
//     if (localStorage.getItem(each) === 'true'){
//         contentEl.classList.add(each)
//     }
// })

// function italicsClicked() {
//     contentEl.classList.toggle('italic-style')
//     const activeStyle = contentEl.classList.contains('italic-style')
//     localStorage.setItem('italic-style', activeStyle)

// }

// function underlineClicked() {
//     contentEl.classList.toggle('decoration-style')
//     const activeStyle = contentEl.classList.contains('decoration-style')
//     localStorage.setItem('decoration-style', activeStyle)
// }

// function fontWeightChange() {
//     contentEl.classList.toggle('weight')
//     const activeStyle = contentEl.classList.contains('weight')
//     localStorage.setItem('weight', activeStyle)
// }


let main = async () => {

    let params = new URLSearchParams(window.location.search)
    let id = params.get('id')

    console.log(id)

    let urlRead = `http://localhost:3040/notes/${id}`

    let displayNotesData = async () => {
        const response = await fetch(urlRead)
        const data = await response.json()
        let { title, content } = data
        console.log(title)
        newNoteData.title = title
        newNoteData.content = content
        titleEL.value = title
        contentEl.value = content
    }



    await displayNotesData()

    titleEL.addEventListener('change', event => {
        newNoteData.title = event.target.value

    })

    contentEl.addEventListener('change', event => {
        newNoteData.content = event.target.value
    })



    

    document.getElementById('save').onclick = async () => {
        console.log('button clicked!!')
        console.log(newNoteData)

        const urlUpdate = `http://localhost:3040/notes/update/${id}`

        let optionsUpdate = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNoteData)
        };

        const response = await fetch(urlUpdate, optionsUpdate)
        const data = await response.json()
        console.log(data)
        

    }


}

main()



let reminderData = {
    date: ''
}

function setReminder() {
    reminderBox.classList.toggle('reminder-box-show')

    document.getElementById('date').addEventListener('change', function (event) {
        reminderData.date = event.target.value
    })
}

let reminderTimer = null

document.getElementById('set').onclick = () => {


    let today = new Date()
    let { date } = reminderData
    let reminderDate = new Date(date)
    let timeDifference = reminderDate - today

    if (timeDifference <= 0) {
        alert('set a future date and time')
    }
    else {
        alert('reminder set successfully!!')

        function reminderSetting() {
            alert(`Reminder ${newNoteData.title}`)
        }
        reminderTimer = setTimeout(reminderSetting, timeDifference)
    }
}

clearTimeout(reminderTimer)

document.getElementById('keep').onclick = () => {
    window.location.href = 'index.html'
}




