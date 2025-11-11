import request from 'supertest';
import express from 'express';
import routesController from '../../adapters/inbound/http/routesController';

const app = express();
app.use(express.json());
app.use('/api', routesController);

describe('GET /api/routes', () => {
  it('responds with JSON', async () => {
    const res = await request(app).get('/api/routes');
    expect(res.status).toBe(200);
  });
});
