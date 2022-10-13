const ticketNum = document.getElementById('ticket-number');
const verifyBtn = document.querySelector('.verify-button');

async function verify() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:3000/staff/verify',{
        method:'POST',
        body: JSON.stringify({
            ticketNumber: ticketNum.value,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });
    const data = await response.json();
    if(data.success) {
        window.location.href = `http://localhost:3000/tickets.html?eventid=${data.eventId}&ticketnumber=${ticketNum.value}`;
    } else {
        alert('Not a valid ticket!')
    }

}
verifyBtn.addEventListener('click', verify);