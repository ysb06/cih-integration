import { Express } from 'express';
import chatbotRouter from './Chatbot';
import test from './Administrator/test';

export default function defineRoutes(app: Express): void {
    app.use('/chat', chatbotRouter);
    app.use('/test', test);
}
