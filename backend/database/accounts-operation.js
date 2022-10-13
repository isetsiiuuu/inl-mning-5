const nedb = require('nedb-promise');
const database = new nedb({ filename: './accounts.db', autoload: true });

// const bcryptFunctions = require('../bcrypt');

async function getAccountByUsername(username) {
    const account = await database.find({ username: username });
    return account[0];
}

module.exports = { getAccountByUsername }