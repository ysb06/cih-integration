import express, { Router } from 'express';
import { SessionsClient, QueryParams, QueryInput, Context, DetectIntentResponse } from 'dialogflow';

const router: Router = Router();
const sessionClient: SessionsClient = new SessionsClient();
const PROJECT_ID = 'csproject-1b085';

//Dialogflow 요청 prototype
interface IDialogflowRequest {
    session: string,
    queryInput: QueryInput,
    queryParams?: QueryParams
}

interface IChatbotRequest { //Chatbot 클라이언트 수신 인터페이스
    session?: string,
    languageCode?: string,
    query: string
}

interface IChatbotResponse { //Chatbot 클라이언트 송신 인터페이스
    languageCode?: string,
    responseText: string
}

router.post('/', async function (req: express.Request, res: express.Response) {
    const reqBody: IChatbotRequest = req.body;
    console.log('Req: ');
    console.log(reqBody);
    if(!reqBody.query) {
        console.error('Empty Query');
        return;
    }

    if(reqBody.session) {   //session은 무조건 클라이언트에서 생성
        const result: IChatbotResponse = await detectIntent(reqBody.session, reqBody.query, [], reqBody.languageCode? reqBody.languageCode : 'ko');
        console.log('Res: ');
        console.log(result);
        res.status(200).json(result);
    } else {
        console.log('Res: Error');
        res.status(400).end();
    }
});

async function detectIntent(
    sessionId: string,
    query: string,
    contexts: Context[],
    languageCode: string
): Promise<IChatbotResponse> {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(
        PROJECT_ID,
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

    console.log('Req to Dialogflow: ');
    console.log(request);
    const responses: DetectIntentResponse[] = await sessionClient.detectIntent(request);
    /*
    console.log(responses.length);
    if(responses.length > 0) {
        for(let i = 0; i < responses.length; i++) {
            console.log(responses[i]);
        }
    }
    // */
    return {
        responseText: responses[0].queryResult.fulfillmentText,
        languageCode: responses[0].queryResult.languageCode
    };
}

export default router;