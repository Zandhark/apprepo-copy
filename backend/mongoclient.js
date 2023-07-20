const mongoose = require('mongoose');
const uri = `mongodb+srv://cenfotec:${process.env.MONGODB_PASS}@cenfotec.swucoqv.mongodb.net/?retryWrites=true&w=majority`;


async function connect() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    console.log(db);
    db.on('error', console.error.bind(console, 'connection error:'));
    return db;
}