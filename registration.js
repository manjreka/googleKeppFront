

// register-form

// emailErr
// userNameErr
// passErr
// cpassErr

// emailEl
// nameEl
// passEL
// cPassEl

let userData = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ""
}

document.getElementById('emailEl').addEventListener('change', function (event) {
    if (event.target.value === '') {
        document.getElementById('emailErr').textContent = '*Required'
    }
    else {
        document.getElementById('emailErr').textContent = ''
    }
    userData.email = event.target.value
})



document.getElementById('nameEl').addEventListener('change', function (event) {
    if (event.target.value === '') {
        document.getElementById('userNameErr').textContent = '*Required'
    }
    else {
        document.getElementById('userNameErr').textContent = ''
    }
    userData.username = event.target.value
})



document.getElementById('passEL').addEventListener('change', function (event) {
    if (event.target.value === '') {
        document.getElementById('passErr').textContent = '*Required'
    }
    else {
        document.getElementById('passErr').textContent = ''
    }
    userData.password = event.target.value
})



document.getElementById('cPassEl').addEventListener('change', function (event) {
    if (event.target.value === '') {
        document.getElementById('cpassErr').textContent = '*Required'
    }
    else {
        document.getElementById('cpassErr').textContent = ''
    }
    userData.confirmPassword = event.target.value
})


function validateUser(userData) {
    let { username, email, password, confirmPassword } = userData
    if (!username || !email || !password || !confirmPassword) {
        alert('Please Enter all Details')
    }
}


function submitUserData(userData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    };

    let regUrl = 'http://localhost:3040/register'

    fetch(regUrl, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
      if (jsonData.message === "user created sccessfully!!"){
            window.location.href = 'index.html'
      }
    
    });






}




document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault()
    validateUser(userData);
    submitUserData(userData)
})