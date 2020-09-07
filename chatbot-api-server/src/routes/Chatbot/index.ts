import express, { Router, NextFunction } from 'express';
import SessionManager, { ChatRole } from './SessionManager';
import createHttpError from 'http-errors';

import decrypt from '../../common/decryptor';
import detectIntent from './IntentDetector';

const router: Router = Router();

const manager: SessionManager = new SessionManager();

interface IChatRequest { //Chatbot 클라이언트 수신 인터페이스
    session: string,
    languageCode?: string,
    query: string
}

interface IChatResponse { //Chatbot 클라이언트 송신 인터페이스
    languageCode?: string,
    responseText: string
}

interface ISessionRequest {
    id?: string,
    secret: string
}

router.post('/', async function (req: express.Request, res: express.Response, next: NextFunction) {
    const reqBody: IChatRequest = req.body;
    //#region 쿼리 유효성 체크
    if (!reqBody.query) {
        next(new createHttpError[400]('No Query body for detecting intent'));
        return;
    }
    if (!reqBody.session) {
        next(new createHttpError[400]('No Session ID'));
        return;
    }
    //#endregion

    manager.addChat(    // 채팅 로그에 유저 질의 추가
        reqBody.session, { role: ChatRole.User, text: reqBody.query }
    );
    const result: IChatResponse = await detectIntent(
        reqBody.session, reqBody.query, [], reqBody.languageCode ? reqBody.languageCode : 'ko'
    );  // 주의: Dialogflow에서 받은 내용을 가공 없이 그대로 내보내고 있음
    manager.addChat(    // 채팅 로그에 봇 답변 추가
        reqBody.session, { role: ChatRole.Chatbot, text: result.responseText }
    );
    res.status(200).json(result);
});

router.get('/session/', async function (req: express.Request, res: express.Response, next: NextFunction) {
    const reqBody: ISessionRequest = {
        secret: req.query.secret as string
    };
    if (!decrypt(reqBody.secret)) {
        next(new createHttpError[403]('Secret Not Matched'));
        return;
    }

    //세션
    res.status(200).json(manager.getSessions());
});

export default router;

// 대화 로그는 Google Stack Driver 연동하면 할 수 있는 것으로 보임
// 그러나 힘들게 Google Stack Driver 연동할 필요 없이 현재처럼 서버에서 로그를 직접 관리하는 것이 더 좋은 것으로 보임
// @types/dialogflow가 Deprecated 된 것은 최신 메서드들을 지원하지 않아서 임.
// Type에 대해서는 작업 중이며 코로나 때문에 지연되었다는 이야기가 있음.