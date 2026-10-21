import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import app from '../src/app.js';

describe('Stayzy API Integration Tests', () => {
  let server;
  let baseUrl;

  before(async () => {
    process.env.NODE_ENV = 'test';
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}/api/v1`;
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('GET /health returns status ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.strictEqual(body.service, 'Stayzy Mumbai REST API');
  });

  test('GET /areas returns list of popular Mumbai localities', async () => {
    const res = await fetch(`${baseUrl}/areas`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
    assert.ok(body.data.some((a) => a.name === 'Powai'));
  });

  test('GET /listings returns paginated stays', async () => {
    const res = await fetch(`${baseUrl}/listings?limit=5`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.data));
    assert.ok(body.pagination);
    assert.ok(body.data.length > 0);
  });

  test('GET /listings/:id returns property details', async () => {
    const res = await fetch(`${baseUrl}/listings/1`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.data.id, '1');
    assert.ok(body.data.title);
    assert.ok(body.data.monthlyPrice > 0);
  });

  test('POST /auth/login authenticates demo student', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@stayzy.in',
        password: 'password123',
      }),
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(body.token);
    assert.strictEqual(body.user.role, 'student');
  });

  test('POST /owner/listings rejects unauthenticated requests', async () => {
    const res = await fetch(`${baseUrl}/owner/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Unauthorized Listing',
        monthlyPrice: 5000,
      }),
    });
    assert.strictEqual(res.status, 401);
  });
});
