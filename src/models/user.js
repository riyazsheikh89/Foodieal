import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true,
    }
}, ({timestamps: true}));


// storing the plain password in the encrypted form
userSchema.pre('save', function(next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const hash = bcrypt.hashSync(user.password, SALT);
    user.password = hash;
    next();
});


// compare the plain password with the encrypted password
userSchema.methods.comparePassword = function compare(password) {
    const response = bcrypt.compareSync(password, this.password);
    return response;
}


userSchema.methods.generateJWT = function generate() {
    const token = jwt.sign({id: this._id, email: this.email}, process.env.JWT_KEY, {expiresIn: '1d'});
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;