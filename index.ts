import express, {Response} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import routes from "./src/routes/studentServiceRoutes";
import helmet from 'helmet';



const app = express();
dotenv.config();
// @ts-ignore
const PORT = process.env.PORT | 4000;




// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));

app.use(mongoSanitize());
//COOKIE PARSER
app.use(cookieParser());

app.use(helmet());
app.disable('x-powered-by');


//json webtokens
// app.use(Jwt);



routes(app);

// serving static files
app.use(express.static('public'));


app.get("/", (req, res): Response=>

    res.send(`Node and express server running on port ${PORT}`)

);

//mongoose connection
mongoose.Promise = global.Promise;
// noinspection JSVoidFunctionReturnValueUsed

mongoose.connect(process.env.MONGODB_URI
    ).then((): void => console.log('connecting'))
    .catch(err => console.log(`error: ${err}`));

mongoose.connection.on('error', err => {
    console.log(err);
});


app.listen(PORT, (): void =>
    console.log(`Your server is running on port ${PORT}`)
);
