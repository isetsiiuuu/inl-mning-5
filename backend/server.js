const express = require('express');
const cookieParser = require('cookie-parser');
const { getAccountByUsername } = require('./database/accounts-operation');
const bcryptFunctions = require('./bcrypt');
const jwt = require('jsonwebtoken');
const { removeTicketFromEvent, getEventById, addTicketToEvent, getEvents } = require('./database/events-operation');
const app = express();
const PORT = 3000;

app.use(express.static('../frontend'));
app.use(express.json());
app.use(cookieParser());

let uniqueId = 0;

app.post('/events', async (req, res) => {
    const events = await getEvents();
    res.json({
        events: events,
    })
});

app.get('/booking/:eventid', (req, res) =>{
    let success = false;
    const eventid = req.params.eventid;

    try {
        uniqueId += 1;
        const newTicket = {
            id: uniqueId,
        };
        addTicketToEvent(eventid, newTicket);
        success = true;
    } catch (error) {
        success = false;
    }

    res.json({
        success: success,
        ticketNumber: uniqueId,
    });
})

app.post('/events/:eventid', async (req, res)=> {
    const eventid = req.params.eventid;
    const event = await getEventById(eventid);
    res.json({
        event
    });
})

app.post('/staff/login', async (req, res)=> {
    const credentials = req.body;
    const resObj = {
        success: false,
        token: ''
    }

    const account = await getAccountByUsername(credentials.username);

    if (account) {
        const correctPassword = await bcryptFunctions.comparePassword(credentials.password, account.password);
        if (correctPassword) {
            resObj.success = true;

            const token = jwt.sign({ username: account.username }, 'abc123', {
                expiresIn: 600 
            });
            
            resObj.token = token;
        }
    }

    res.json(resObj);
});

app.get('/staff/loggedIn', (req,res)=> {
    const token = req.headers.authorization.replace('Bearer ', '');

    let resObj = {
        loggedIn: false
    }

    try {
        const data = jwt.verify(token, 'abc123');
    
        if (data) {
            resObj.loggedIn = true;
        }
    } catch (error) {
        resObj.errorMessage = 'Token expired';
    }

    res.json(resObj);
});

app.post('/staff/verify', async (req, res)=> {
    const token = req.headers.authorization.replace('Bearer ', '');

    const ticketNumber = req.body.ticketNumber;
    let resObj = {
        success:false,
        eventId: '',
    }

    try {
        const isValidToken = jwt.verify(token, 'abc123');

        if(isValidToken) {
            const event = await removeTicketFromEvent(ticketNumber);
            resObj.success = true;
            resObj.eventId = event.id;
        }
    } catch (error) {
        resObj.success = false;
    }
    

    res.json(resObj);
});    

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});