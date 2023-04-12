import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    avatar: {
        url: {type: String},
        key: {type: String}
    },
    role: {
        type: String,
        default: 'user'
    },
    passwordResetToken: String,     // stores unique token for password resetting
    resetTokenExpiry: Date,         // reset token expiry time
}, ({timestamps: true}));


// storing the plain password in the encrypted form
userSchema.pre('save', function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const SALT = bcrypt.genSaltSync(9);
    const hash = bcrypt.hashSync(this.password, SALT);
    this.password = hash;
    next();
});


// compare the plain password with the encrypted password
userSchema.methods.comparePassword = function compare(password) {
    const response = bcrypt.compareSync(password, this.password);
    return response;
}

// generate JWT token for authentiication
userSchema.methods.generateJWT = function generate() {
    const token = jwt.sign({id: this._id, email: this.email}, process.env.JWT_KEY, {expiresIn: '1d'});
    return token;
}

// generate token for password reset, and store in the DB
userSchema.methods.generatePasswordResetToken = function () {
  // Generate a random 32-byte token
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = token;
  this.resetTokenExpiry =  Date.now() + 15 * 60 * 1000;     //token is valid for 15 min
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;