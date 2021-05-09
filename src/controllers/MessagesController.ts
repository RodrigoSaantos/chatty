import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

export class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;
    const messagesService = new MessagesService();

    const message = await messagesService.create({ admin_id, text, user_id });

    return response.status(201).json(message);
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesService = new MessagesService();

    const list = await messagesService.listByUser({ user_id: id });

    return response.json(list);
  }
}