const mongoose = require('mongoose');
const userData = require('../data/users.mjs');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/geniedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB!');

    User.insertMany(userData)
      .then(() => console.log('Data seeded'))
      .catch(err => console.error('Could not seed data', err))
      .finally(() => mongoose.connection.close());
  });
};

module.exports = connect;
