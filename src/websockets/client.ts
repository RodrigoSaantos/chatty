import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService';
import { MessageService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messageService = new MessageService();

  socket.on('client_first_access', async (params) => {

    const socket_id = socket.id;
    const { email, text } = params as IParams;

    let user_id = null;

    const userExists = await usersService.findByEmail({ email });
    
    if(!userExists) {
      const user = await usersService.create({ email });

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;

    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId({
        user_id: userExists.id,
      });

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      }
    }

    await messageService.create({ 
      text,
      user_id,
    })
  });
});