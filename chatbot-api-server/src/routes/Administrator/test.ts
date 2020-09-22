import express, { Router } from 'express';
import SessionManager from '../Chatbot/SessionManager';
import fetch, { Response } from 'node-fetch';

const router: Router = Router();

const manager: SessionManager = new SessionManager();

router.get('/', async function (req: express.Request, res: express.Response) {
    const weatherResult: Response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3092a1443316a00e2a06506060e0b558&units=metric&lang=kr');
    const weatherInfo: JSON = await weatherResult.json();

    res.status(200).send(weatherInfo);
});

router.post('/', async function (req: express.Request, res: express.Response) {
    const temp = manager.getSessions();
    for (const key in temp) {
        console.log(key);
    }
    res.status(200).send('OK');
});

export default router;