import express, { Router } from 'express';
import { SessionsClient, QueryParams, QueryInput, Context, DetectIntentResponse } from 'dialogflow';
import SessionManager, { ChatRole } from './SessionManager';

const PROJECT_ID = 'csproject-1b085';
const router: Router = Router();
const sessionClient: SessionsClient = new SessionsClient();
const manager: SessionManager = new SessionManager();

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
    //console.log('Req: ');
    //console.log(reqBody);
    if (!reqBody.query) {
        console.error('Empty Query');
        return;
    }

    // 채팅 로그에 유저 질의 추가
    manager.addChat(
        reqBody.session ? reqBody.session : 'Unknown',
        { role: ChatRole.User, text: reqBody.query }
    );

    if (reqBody.session) {   //session은 무조건 클라이언트에서 생성
        const result: IChatbotResponse = await detectIntent(reqBody.session, reqBody.query, [], reqBody.languageCode ? reqBody.languageCode : 'ko');
        //console.log('Res: ');
        //console.log(result);

        // 채팅 로그에 봇 답변 추가
        manager.addChat(
            reqBody.session ? reqBody.session : 'Unknown',
            { role: ChatRole.Chatbot, text: result.responseText }
        );
        res.status(200).json(result);
    } else {
        console.log('Res: Error');
        res.status(400).end();
    }
    
    if(reqBody.session) {
        manager.getSession(reqBody.session);
    }
});

// 대화 로그는 Google Stack Driver 연동하면 할 수 있는 것으로 보임
// 그 외의 대화 로그 얻는 것은 불가능해 보임.
// @types/dialogflow가 Deprecated 된 것은 최신 메서드들을 지원하지 않아서 임.
// Type에 대해서는 작업 중이며 코로나 때문에 지연되었다는 이야기가 있음.
// 어쨌든 후에 Stack Driver 연동을 하더라도 세션은 따로 구현해야 할 듯.

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