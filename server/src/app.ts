import Koa from 'koa';
import cors from '@koa/cors';

import api from './api';

const app = new Koa();

app.use(cors({origin: '*'}));

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	// console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(api.routes());

export default app;