import assert from 'node:assert/strict';
import { createApiClient, ApiError } from './mobile-client.mjs';
const baseUrl = process.env.GUILLIAMS_API_URL ?? 'http://127.0.0.1:8765';
let token = null;
const api = createApiClient(baseUrl, {
  getToken: async () => token,
  saveToken: async (value) => { token = value; },
});
const session = await api.login('alice', 'DemoPass123!');
assert.equal(session.user.username, 'alice');
assert.ok(token);
const feed = await api.request('/api/feed/');
assert.equal(feed.required_sponsors, 3);
assert.ok(feed.listings.items.length);
const empty = await api.request('/api/listings/?q=nonexistent-smoke-example');
assert.equal(empty.total, 0);
try {
  await api.request('/api/me/', { method: 'PATCH', body: { first_name: '' } });
  assert.fail('Expected validation error');
} catch (error) {
  assert.ok(error instanceof ApiError);
  assert.equal(error.status, 422);
  assert.ok(error.fields.length);
}
await api.logout();
assert.equal(token, null);
try {
  await api.request('/api/me/');
  assert.fail('Expected missing session');
} catch (error) {
  assert.equal(error.status, 401);
}
console.log('Mobile fetch client smoke passed: login, feed, empty results, validation, logout and 401 handling.');
