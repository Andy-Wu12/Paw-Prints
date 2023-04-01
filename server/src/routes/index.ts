import Router from '@koa/router';

const indexRouter = new Router();

indexRouter.get('/', (ctx) => {
	const port = process.env.PORT || 8080;

	ctx.body = {'Server\'s API Endpoints': {
		'Getting random dog image': {
			'route' : '/dogs/random',
			'example' : `http://localhost:${port}/dogs/random`},
		'Getting random images for dogs with sub-breeds': {
			'route' : '/dogs/:breed/:subBreed/images/:amount',
			'example' : `http://localhost:${port}/dogs/retriever/golden/images/5`},
		'Getting random images by breed (no sub-breeds)': {
			'route': '/dogs/:breed/images/:amount',
			'example': `http://localhost:${port}/dogs/germanshepherd/images/5`},
		'Get all available breed names': {
			'route': '/dogs/breeds',
			'example': `http://localhost:${port}/dogs/breeds`}
	}};
});

export default indexRouter;