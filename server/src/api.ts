import Router from '@koa/router';

import dogsRouter from "./routes/dogs";
import indexRouter from "./routes";

const api = new Router();

api.use('/dogs', dogsRouter.routes());
api.use('/', indexRouter.routes());

export default api;