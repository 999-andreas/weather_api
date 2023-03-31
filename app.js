/*import {saying_hi, dire_aurevoir} from './utlis.js';

saying_hi();

dire_aurevoir();
*/

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet"; //pour la securité, on ne renvoie rien lorsqu'on fait une requete
import session from 'express-session'

import weatherRoute from './routes/Weather.js';
import authRoute from './routes/auth.js';
import weather from "./models/weather.js";


const App = express();
App.use(morgan('dev'));
App.use(helmet());
App.use(express.json());
App.use(session({
    secret: 'wojak man',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false
    }
}));


mongoose.connect('mongodb://root:root@127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('DB connect'))
.catch((error) => console.log('error:', error));



App.get('/', (req,res)=>{
    res.send("<h1> C'EST BON</h1>");
});

App.use('/api/weather', weatherRoute);
App.use('/api', authRoute);
App.use('/api/Paris',weatherRoute);


const PORT = 6546;

App.listen(PORT, ()=>{
    console.log(`server ready, http://localhost:${PORT}`);
});

