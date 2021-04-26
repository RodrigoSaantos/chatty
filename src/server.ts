import "reflect-metadata";
import express, { json } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { router } from './routes';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set("views", path.join(__dirname, '..', 'public'));
app.engine("html", require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
});

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Criando protocolo websocket

io.on("connection", (socket: Socket) => {
  console.log("Se conectou", socket.id);
});

app.use(json());
app.use(router)

http.listen(3333, () => {
  console.log('🚀 App listening on port 3333!');
});