import createError from 'http-errors';
import express from 'express';
import setRouters from './routes';

const app: express.Express = express();

//Router 정의
setRouters(app);

//Error 처리
app.use(function(req, res, next) {
    next(createError(404));
});

// 예외 제외 처리 하지 않으면 제대로 동작 안 함
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3001, () => {
    console.log('Server runs at port 3001');
});
