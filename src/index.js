import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import { passportAuth } from './config/passport-jwt-strategy.js';
import connect from './config/db-config.js';
import { PORT } from './config/env-variables.js';
import apiRoutes from './routes/index.js';


const app =  express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log(`Server is listening on Port: ${PORT}`);
    await connect();
})