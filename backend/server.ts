import Koa = require('koa');
import Router = require('@koa/router');
import cors = require('@koa/cors');
import fetch = require('isomorphic-fetch');

const app = new Koa();
const router = new Router();
const port = 8080;

// Max number of images available in one query.
const maxCount = 50;

app.use(cors({origin: '*'}));

router.get('/', (ctx) => {
	ctx.body = {'Server\'s API Endpoints': {
		'Getting random dog image': {
			'route' : '/dog/get-random',
			'example' : `http://localhost:${port}/dog/get-random`},
		'Getting random images for dogs with sub-breeds': {
			'route' : '/dog/:breed/:subBreed/get-images/:amount',
			'example' : `http://localhost:${port}/dog/retriever/golden/get-images/50`},
		'Getting random images by breed (no sub-breeds)': {
			'route': '/dog/:breed/get-images/:amount',
			'example': `http://localhost:${port}/dog/germanshepherd/get-images/25`},
		'Get all available breed names': {
			'route': '/breeds',
			'example': `http://localhost:${port}/breeds`}
	}};
});

// Route to fetch from Dog API's 'random' endpoint
router.get('/dog/get-random', async (ctx) => {
	try {
		const response = await fetch('https://dog.ceo/api/breeds/image/random');
		if(response.status >= 400) {
			throw new Error('Bad response from server');
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 500;
		ctx.body = 'Please try again later';
	}
});

// Route to fetch random images of specific sub-breed
router.get('/dog/:breed/:subBreed/get-images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	const subBreed = ctx.params['subBreed'];

	try {
		let imageCount = parseInt(ctx.params['amount']);
		if(isNaN(imageCount) || imageCount < 0) {
			imageCount = 1;
		}
		else if(imageCount > maxCount) {
			imageCount = maxCount;
		}

		const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${imageCount}`;
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 500;
		ctx.body = 'Please try again later';
	}

});

// Route to fetch all images of breed
router.get('/dog/:breed/get-images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	
	try {
		let imageCount = parseInt(ctx.params['amount']);
		if(isNaN(imageCount) || imageCount < 0) {
			imageCount = 1;
		}
		else if(imageCount > maxCount) {
			imageCount = maxCount;
		}

		const url = `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`;
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 500;
		ctx.body = 'Please try again later';
	}

});

// Fetch all breed names
router.get('/breeds', async (ctx) => {
	const url = 'https://dog.ceo/api/breeds/list/all';
	try {
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 500;
		ctx.body = 'Please try again later';
	}
	
});

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

app.use(router.routes());

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
