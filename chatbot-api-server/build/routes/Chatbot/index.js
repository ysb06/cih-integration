"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dialogflow_1 = require("dialogflow");
const router = express_1.Router();
const sessionClient = new dialogflow_1.SessionsClient();
const PROJECT_ID = 'csproject-1b085';
router.post('/', async function (req, res) {
    const reqBody = req.body;
    console.log('Req: ');
    console.log(reqBody);
    if (!reqBody.query) {
        console.error('Empty Query');
        return;
    }
    if (reqBody.session) { //session은 무조건 클라이언트에서 생성
        const result = await detectIntent(reqBody.session, reqBody.query, [], reqBody.languageCode ? reqBody.languageCode : 'ko');
        console.log('Res: ');
        console.log(result);
        res.status(200).json(result);
    }
    else {
        console.log('Res: Error');
        res.status(400).end();
    }
});
async function detectIntent(sessionId, query, contexts, languageCode) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(PROJECT_ID, sessionId);
    // The text query request.
    const request = {
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
    const responses = await sessionClient.detectIntent(request);
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
exports.default = router;
