import mongoose from 'mongoose';
import {MONGODB_URL} from '../config/env-variables.js';

const connect= async () => {
    mongoose.connect(MONGODB_URL);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, "error connecting to db!"));
    db.once('open', function() {
        console.log('MongoDB connected successfully...');
    });
}

export default connect;