import express, { Router } from 'express';
import { SessionsClient, QueryParams, Context } from 'dialogflow';

const router: Router = Router();
const sessionClient: SessionsClient = new SessionsClient();

router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('OK');
    next();
});

router.post('/', function (req: express.Request, res: express.Response) {
    detectIntent('', '', '', [], '');
    res.status(200).end();
});

///prototype
interface IDialogflowRequest {
    session: string,
    queryInput: {
        text: {
            text: string,
            languageCode: string
        }
    }
    queryParams?: QueryParams
}

async function detectIntent(
    projectId: string,
    sessionId: string,
    query: string,
    contexts: Context[],
    languageCode: string
) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request: IDialogflowRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

export default router;