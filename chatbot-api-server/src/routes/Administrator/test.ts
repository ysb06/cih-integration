import express, { Router } from 'express';
import SessionManager from '../Chatbot/SessionManager';

const router: Router = Router();

const manager: SessionManager = new SessionManager();

router.post('/', function (req: express.Request, res: express.Response) {
    const temp = manager.getSessions();
    for (const key in temp) {
        console.log(key);
    }
    res.status(200).send('OK');
});

export default router;