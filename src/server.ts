import "reflect-metadata";
import express, { json } from 'express';

import './database';
import { router } from './routes';

const app = express();
app.use(json());

app.use(router)

app.listen(3333, () => {
  console.log('🚀 App listening on port 3333!');
});