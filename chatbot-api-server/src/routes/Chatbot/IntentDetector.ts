import { SessionsClient, QueryParams, QueryInput, Context, DetectIntentResponse } from 'dialogflow';

const PROJECT_ID = 'csproject-1b085';
const sessionClient: SessionsClient = new SessionsClient();

//Dialogflow 요청 prototype
interface IDialogflowRequest {
    session: string,
    queryInput: QueryInput,
    queryParams?: QueryParams
}

export interface IDialogflowResponse { //Chatbot 클라이언트 송신 인터페이스
    languageCode?: string,
    responseText: string
}

export default async function detectIntent(
    sessionId: string,
    query: string,
    contexts: Context[],
    languageCode: string
): Promise<IDialogflowResponse> {
    // The path to identify the agent that owns the created intent.
    const sessionPath: string = sessionClient.sessionPath(
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

    console.log('\nReq to Dialogflow: ');
    console.log(request);
    const responses: DetectIntentResponse[] = await sessionClient.detectIntent(request);

    return {
        responseText: responses[0].queryResult.fulfillmentText,
        languageCode: responses[0].queryResult.languageCode
    };
}