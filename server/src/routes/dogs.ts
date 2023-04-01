import Router from '@koa/router';
import fetch from 'isomorphic-fetch';

const dogsRouter = new Router();

const maxCount = 50;

function validateCount(count: number): number {
  let imageCount = count;
  if(isNaN(imageCount) || imageCount < 0) {
    imageCount = 1;
  }
  else if(imageCount > maxCount) {
    imageCount = maxCount;
  }

  return imageCount;
}

// Route to fetch from Dog API's 'random' endpoint
dogsRouter.get('/random', async (ctx) => {
	try {
		const response = await fetch('https://dog.ceo/api/breeds/image/random');
		if(response.status >= 400) {
			throw new Error('Bad response from server');
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 400;
		ctx.body = 'Please try again later';
	}
});

// Route to fetch random images of specific sub-breed
dogsRouter.get('/:breed/:subBreed/images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	const subBreed = ctx.params['subBreed'];

	try {
		let imageCount = validateCount(parseInt(ctx.params['amount']));

		const url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${imageCount}`;
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 400;
		ctx.body = 'Please try again later';
	}

});

// Route to fetch all images of breed
dogsRouter.get('/:breed/images/:amount', async (ctx) => {
	// named route parameters ( :name ) are captured and added to ctx.params (dictionary)
	const breed = ctx.params['breed'];
	
	try {
		let imageCount = validateCount(parseInt(ctx.params['amount']));

		const url = `https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`;
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 400;
		ctx.body = 'Please try again later';
	}

});

// Fetch all breed names
dogsRouter.get('/breeds', async (ctx) => {
	const url = 'https://dog.ceo/api/breeds/list/all';
	try {
		const response = await fetch(url);
		if(response.status >= 400) {
			throw new Error("Bad response from server");
		}
		const data = await response.json();
		ctx.body = data;

	} catch(error) {
		ctx.status = 400;
		ctx.body = 'Please try again later';
	}
	
});

export default dogsRouter;