const container = document.getElementById('container');
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

async function loadTicket(){
    
    let eventid = params.eventid; 
    let ticketNumber = params.ticketnumber;

    const response = await fetch(`/events/${eventid}`,{
        method:'POST'
    });
    const data = await response.json();
    const event = data.event;

    console.log('event', event)

    const ticketRow = document.createElement('div');
    ticketRow.classList.add('ticket-row1');
    container.appendChild(ticketRow);
    const whatEvent = document.createElement('span');
    whatEvent.classList.add('wq-event');
    whatEvent.innerHTML = 'WHAT';
    ticketRow.appendChild(whatEvent);

    const whatEventName = document.createElement('span');
    whatEventName.classList.add('event-name');
    whatEventName.innerHTML = event.name;
    ticketRow.appendChild(whatEventName);

    const ticketRow2 = document.createElement('div');
    ticketRow2.classList.add('ticket-row2');
    container.appendChild(ticketRow2);


    const whereEvent = document.createElement('span');
    whereEvent.classList.add('wq-event');
    whereEvent.innerHTML = 'WHERE';
    ticketRow2.appendChild(whereEvent);

    const whereEventName = document.createElement('span');
    whereEventName.classList.add('event-place');
    whereEventName.innerHTML = event.location;
    ticketRow2.appendChild(whereEventName);

    const ticketRow3 = document.createElement('div');
    ticketRow3.classList.add('ticket-row3');
    container.appendChild(ticketRow3);

    const ticketInner = document.createElement('div');
    ticketInner.classList.add('ticket-inner');
    ticketRow3.appendChild(ticketInner);

    const importantInfoTicket1 =document.createElement('div');
    importantInfoTicket1.classList.add('important-info-ticket');
    ticketInner.appendChild(importantInfoTicket1);

    const whenEventName = document.createElement('span');
    whenEventName.classList.add('wq-event');
    whenEventName.innerHTML = 'WHEN';
    importantInfoTicket1.appendChild(whenEventName);

    const dateEvent = document.createElement('span');
    dateEvent.innerHTML = '21 Mar';
    importantInfoTicket1.appendChild(dateEvent);

    const importantInfoTicket2 =document.createElement('div');
    importantInfoTicket2.classList.add('important-info-ticket');
    ticketInner.appendChild(importantInfoTicket2);

    const fromEventName = document.createElement('span');
    fromEventName.classList.add('wq-event');
    fromEventName.innerHTML = 'FROM';
    importantInfoTicket2.appendChild(fromEventName);

    const timeParts = event.time.split("-")
    const startTime = document.createElement('span');
    startTime.innerHTML = timeParts[0];
    importantInfoTicket2.appendChild(startTime);

    const importantInfoTicket3 =document.createElement('div');
    importantInfoTicket3.classList.add('important-info-ticket');
    ticketInner.appendChild(importantInfoTicket3);

    const toEventName = document.createElement('span');
    toEventName.classList.add('wq-event');
    toEventName.innerHTML = 'TO';
    importantInfoTicket3.appendChild(toEventName);

    const endTime = document.createElement('span');
    endTime.innerHTML = timeParts[1];
    importantInfoTicket3.appendChild(endTime);

    const codeBar = document.createElement('div');
    codeBar.classList.add('code-bar');
    codeBar.innerHTML = 'we had le';
    ticketRow3.appendChild(codeBar);

    const ticketNum = document.createElement('div');
    ticketNum.classList.add('ticket-number');
    ticketNum.innerHTML = 'Biljetnummer: ' + ticketNumber;
    ticketRow3.appendChild(ticketNum); 
        
    
}
loadTicket();