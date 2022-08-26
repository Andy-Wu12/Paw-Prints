import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import fetch from 'isomorphic-fetch';

const app = new Koa();
const router = new Router();
const port = 3011;


app.use(cors({origin: '*'}));

router.get('/', (ctx) => {
	ctx.body = 'hello!';
});

// Set up route to fetch from dog's random endpoint
router.get('/dog/get-random', async (ctx) => {
	const queryData = await fetch('https://dog.ceo/api/breeds/image/random')
		.then(function(response) {
			if(response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			// console.log(data);
			return data;
		});
	
	ctx.body = queryData;

});

// Set up route to fetch all images of breed (including sub-breeds)
router.get('/dog/:breed/get-images', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const queryData = await fetch(`https://dog.ceo/api/breed/${ctx.params['breed']}/images`)
		.then(function(response) {
			if(response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			// console.log(data);
			return data;
		});
	
	ctx.body = queryData;

});

app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
