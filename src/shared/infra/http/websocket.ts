import { io } from './index';

io.on('connection', socket => {
  console.log('socket conectado 🔛: ', socket);
});
