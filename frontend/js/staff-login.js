const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.querySelector('.loggin-button');

async function login(){
    const response = await fetch('http://localhost:3000/staff/login',{
        method :'POST',
        body: JSON.stringify({
            password: password.value,
            username: username.value,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    if(data.success) {
        sessionStorage.setItem('token', data.token);
        window.location.href = 'http://localhost:3000/staff/verify.html';
    } else {
        alert('password or username wrong!');
    }
}

loginBtn.addEventListener('click', login);