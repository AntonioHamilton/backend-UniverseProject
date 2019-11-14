const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        unique: true,
        trim: false,
        required: true
    },
    password: {
        type: String,
        trim: false,
        required: true,
        hidden: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
})

UserSchema.pre('save', function(next) {
    // Hash the password
    if (this.isModified('password')) {
      this.password = this.encryptPassword(this.password);
    }
    return next();
});

UserSchema.methods = {
    authenticate(plainTextPassword) {
      return bcrypt.compareSync(plainTextPassword, this.password);
    },
    encryptPassword(password) {
      return bcrypt.hashSync(password, 8);
    },
  };

module.exports = mongoose.model('User', UserSchema);