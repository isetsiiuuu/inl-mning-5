const nedb = require('nedb-promise');
const database = new nedb({ filename: './events.db', autoload: true });

async function getEventById(id) {
    const event = await database.find({ id: id });
    return event[0];
}

async function getEvents() {
    const events = await database.find({});
    return events;
}

function addTicketToEvent(eventId, ticket) {
    database.update({ id: eventId }, { $push: { tickets: ticket }});
}

async function removeTicketFromEvent(ticketId) {
    const event = await database.find({ tickets: { id: Number(ticketId) }});
    database.update({ tickets: { id: Number(ticketId) } }, { $pull: { tickets: {id: Number(ticketId)} }});
    return event[0];
}

module.exports = {
    getEventById,
    getEvents,
    addTicketToEvent,
    removeTicketFromEvent,
}
