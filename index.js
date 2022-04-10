const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const Note = require('./Note');
const User = require('./User');

module.exports = { Note, User };

