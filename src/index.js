import express from 'express';
import bodyParser from 'body-parser';
import controllers from './controllers';
import dbConnect from './config';
import auth from './middlewares/auth';

dbConnect();
const { PORT = 3000 } = process.env;
const app = express();
const onServerCreated = () => {
  console.log('el servidor ha sido creado correctamente');
};
app.use(bodyParser.json());
app.use(auth);
controllers(app);
app.listen(PORT, onServerCreated);
