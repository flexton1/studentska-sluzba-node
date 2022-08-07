import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes/studentServiceRoutes';
import cookieParser from 'cookie-parser';



const app = express();
const PORT = 4000;

//mongoose connection
mongoose.Promise = global.Promise;
// noinspection JSVoidFunctionReturnValueUsed
mongoose.connect('mongodb://localhost/studentska-sluzba',
{
    maxPoolSize:50,
    wtimeoutMS:2500,
    useNewUrlParser:true
}).then(console.log('connecting'))
.catch(err => console.log(`error: ${err}`))

// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
//COOKIE PARSER
app.use(cookieParser());


//json webtokens
// app.use(Jwt);



routes(app);

// serving static files
app.use(express.static('public'));


app.get("/", (req, res) => 

    res.send(`Node and express server running on port ${PORT}`)

);


app.listen(PORT, () => 
    console.log(`Your server is running on port ${PORT}`)
);
