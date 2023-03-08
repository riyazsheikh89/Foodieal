import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect= async () => {
    mongoose.connect('mongodb://localhost/Foodieal');
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, "error connecting to db!"));
    db.once('open', function() {
        console.log('MongoDB connected successfully...');
    });
}

export default connect;