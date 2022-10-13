const container =document.querySelector('#container');
const eventElements = document.querySelectorAll('.event-item');

/**
 * - call this function onClick event
 * - send eventId with it
 */
function selectEvent (eventId){
    return async function(){
        const response = await fetch('http://localhost:3000/booking/'+eventId);
        const data = await response.json();

        if (data.success) {
            window.location.href = `http://localhost:3000/tickets.html?eventid=${eventId}&ticketnumber=${data.ticketNumber}`;
        } else {
            alert('something went wrong')
        }
    }
};

async function onload() {
    const response = await fetch('http://localhost:3000/events', {
        method: 'POST'
    });
    const data = await response.json();
    const events = data.events;
    events.forEach(event => {
        
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.addEventListener('click', selectEvent(event.id));

        const eventDate = document.createElement('div');
        eventDate.classList.add('event-date-square');
        eventDate.innerHTML = event.date;
        eventItem.appendChild(eventDate);

        const eventInfo = document.createElement('div');
        eventInfo.classList.add('event-info');
        eventItem.appendChild(eventInfo);

        const eventName = document.createElement('span');
        eventName.classList.add('event-name');
        eventName.innerHTML = event.name;
        eventInfo.appendChild(eventName);

        const location = document.createElement('span');
        location.classList.add('organizer');
        location.innerHTML = event.location;
        eventInfo.appendChild(location);

        const details = document.createElement('div');
        details.classList.add('event-details');
        eventInfo.appendChild(details);

        const eventTime = document.createElement('span');
        eventTime.classList.add('event-time');
        eventTime.innerHTML = event.time;
        details.appendChild(eventTime);

        const price = document.createElement('span');
        price.classList.add('price');
        price.innerHTML = event.price;
        details.appendChild(price);

        const horizontalLine = document.createElement('hr');
        eventInfo.appendChild(horizontalLine);

        container.appendChild(eventItem);
        
    });
}

onload();