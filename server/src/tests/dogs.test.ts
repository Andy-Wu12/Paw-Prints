import request from 'supertest';

import app from '../app';

describe('Dogs API /dogs', () => {
    const BASE_API_URL = '/dogs';
    const MIN_IMAGES_PER_QUERY = 1;
    const MAX_IMAGES_PER_QUERY = 50;

  describe('Test GET /breeds', () => {
    const ROUTE = `${BASE_API_URL}/breeds`;

    test('It should respond with a 200 success', async () => {
      const response = await request(app.callback())
        .get(ROUTE);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/)
    });
  })

  describe('Test GET /random', () => {
    const ROUTE = `${BASE_API_URL}/random`;

    test('It should respond with a 200 success', async () => {
      const response = await request(app.callback())
        .get(ROUTE)

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/)
    });
  })

  describe('Test GET by breed name', () => {
    const underMinCount = MIN_IMAGES_PER_QUERY - 1;
    const imageCount = 5;
    const overMaxCount = MAX_IMAGES_PER_QUERY + 1;

    describe('Test GET /:breed/images/:amount', () => {
      const BREED_ROUTE = `${BASE_API_URL}/germanshepherd/images`;

      test('It should default to 1 image if the provided count is less than 1', async () => {
        const response = await request(app.callback())
          .get(`${BREED_ROUTE}/${underMinCount}`)

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(MIN_IMAGES_PER_QUERY);
      });

      test('It should default to 50 if the provided count is greater than 50', async () => {
        const response = await request(app.callback())
          .get(`${BREED_ROUTE}/${overMaxCount}`)
        
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(MAX_IMAGES_PER_QUERY);
      });

      test('It should provide the desired number of images', async () => {
        const response = await request(app.callback())
          .get(`${BREED_ROUTE}/${imageCount}`)
        
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(imageCount);
      });

    })

    describe('Test GET /:breed/:subBreed/images/:amount', () => {
      const SUB_BREED_ROUTE = `${BASE_API_URL}/retriever/golden/images`;

      test('It should default to 1 image if the provided count is less than 1', async () => {
        const response = await request(app.callback())
          .get(`${SUB_BREED_ROUTE}/${underMinCount}`)

        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(MIN_IMAGES_PER_QUERY);
      });

      test('It should default to 50 if the provided count is greater than 50', async () => {
        const response = await request(app.callback())
          .get(`${SUB_BREED_ROUTE}/${overMaxCount}`)
        
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(MAX_IMAGES_PER_QUERY);
      });

      test('It should provide the desired number of images', async () => {
        const response = await request(app.callback())
          .get(`${SUB_BREED_ROUTE}/${imageCount}`)
        
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('status', 'success')
        expect(response.body).toHaveProperty('message')
        expect(response.body.message.length).toEqual(imageCount);
      });

    })
    
  })

})