import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import fetch from 'isomorphic-fetch';

const app = new Koa();
const router = new Router();
const port = 3011;


app.use(cors({origin: '*'}));

// router.get('/', (ctx) => {
// 	ctx.body = 'hello!';
// });

// Route to fetch from Dog API's 'random' endpoint
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
		})
		.catch(error => {throw new Error(error)});
	
	ctx.body = queryData;

});

// Route to fetch random images of specific sub-breed
router.get('/dog/:breed/:subBreed/get-images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	const subBreed = ctx.params['subBreed'];
	const imageCount = ctx.params['amount'];
	const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${imageCount}`;
	const queryData = await fetch(url)
		.then(function(response) {
			if(!response.ok) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			return data;
		})
		.catch(error => {throw new Error(error)});
	
	ctx.body = queryData;

});

// Route to fetch all images of breed
router.get('/dog/:breed/get-images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	const imageCount = ctx.params['amount'];
	const url = `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`;
	const queryData = await fetch(url)
		.then(function(response) {
			if(!response.ok) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			return data;
		})
		.catch(error => {throw new Error(error)});
	
	ctx.body = queryData;

});

// Fetch all breed names
router.get('/breeds', async (ctx) => {
	const url = 'https://dog.ceo/api/breeds/list/all';
	const breedData = await fetch(url)
		.then(function(response) {
			if(!response.ok) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
		.then(function(data) {
			return data;
		})
		.catch(error => {throw new Error(error)});
	
	ctx.body = breedData;
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
