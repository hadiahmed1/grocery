import { Server } from "socket.io";
import server from "./expressConfig";

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log("Socket:>>",socket.id);
  console.log('A USER CONNECTED');
});