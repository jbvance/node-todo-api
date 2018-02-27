const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Don't use an arrow function because arrow functions
// don't bind 'this' and we need to bind 'this'
// because 'this' stores the individual user document

// Override the value that gets sent back when
// you return a user object from a function
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  
  // Only return _id and email, NOT password or token
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save()
    .then(() => {
      return token;
    });
};

UserSchema.methods.removeToken = function (token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};
// Using statics means it's a model method rather
// than an instance method
UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded = undefined;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    // same as above
    return Promise.reject();
  }

  // You have to use quotes when accessing 
  // nested property in a document. You don't have to
  // do it with _id, but I use quotes here for consistency
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({email}).then(user => {
    if (!user) {
      return Promise.reject();
    } else {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {          
            resolve(user);
          } else {            
            reject(err);
          }
        })
      })
    }
  });
}

UserSchema.pre('save', function (next) {
  user = this;  
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });      
    })
  } else {
    next();
  }
});

// User
const User = mongoose.model('User', UserSchema);

module.exports = {User};



// Example of inserting a new user
// const newUser = new User({
//   email: '    jason@gmail.com    '
// });

// newUser.save()
//   .then(doc => {
//     console.log('Saved user', doc);
//   })
//   .catch((e => {
//     console.log('Unable to save user', e);
//   }));