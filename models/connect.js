const mongoose = require('mongoose');
const User = require('./models/user');
const userData = require('./data/users.json');

mongoose.connect('mongodb://localhost:27017/geniedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  User.insertMany(userData)
    .then(() => console.log('Data seeded'))
    .catch(err => console.error('Could not seed data', err))
    .finally(() => mongoose.connection.close());
});
