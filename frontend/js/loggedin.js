async function loggedIn() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:3000/staff/loggedIn', {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const data = await response.json();

    if (data.loggedIn == false) {
        window.location.href = 'http://localhost:3000/staff/login.html';
    } 
}

loggedIn();