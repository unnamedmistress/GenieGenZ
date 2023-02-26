const User = require('./modlels/Schema.js');

// Create a new user
const user = new User({
  username: 'john.doe',
  password: 'password123',
});
user.save();

// Find a user by username
User.findOne({ username: 'john.doe' }).then((user) => {
  console.log(user);
});

// Update a user's password
User.findOneAndUpdate(
  { username: 'john.doe' },
  { password: 'newPassword123' }
);

// Delete a user
User.deleteOne({ username: 'john.doe' });
