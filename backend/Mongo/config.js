const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customers_alloc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', function() {
    console.log('database is connected successfully');
});
connection.on('disconnected', function() {
    console.log('database is disconnected successfully');
});

connection.on('error', console.error.bind(console, 'connection error:'));
module.exports = connection;
