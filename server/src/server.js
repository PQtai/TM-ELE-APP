import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/Database.config.js';
import routes from './api/routes/index.js';
import { allowCrossDomain } from './api/utils/corsMiddleware.js';
dotenv.config();
const app = express();

// Add headers before the routes are defined
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(allowCrossDomain);
app.use(morgan('combined'));

//Connect database
db.connect(process.env.MONGODB_URL);
//routes
routes(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
