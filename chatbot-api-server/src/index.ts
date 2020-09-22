import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import setRouters from './routes';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app: express.Express = express();

//ejs 사용 설정
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));

//미들웨어 로드
app.use(cors());    //cors 설정
app.use(bodyParser.json());

//Router 정의
setRouters(app);

//404 Error 처리
app.use(function(req, res, next) {
    console.log(req.headers);
    next(createError(404, 'No resources'));
});

// 예외 제외 처리 하지 않으면 제대로 동작 안 함
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(404).render('error', { code: err.statusCode, message: err.message });
});

app.listen(3001, () => {
    console.log('Server runs at port 3001');
});
