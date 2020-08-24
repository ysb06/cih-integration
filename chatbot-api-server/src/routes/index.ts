import { Express } from 'express';
import chatbotRouter from './Chatbot';

export default function defineRoutes(app: Express): void {
    app.use('/chat', chatbotRouter);
}
