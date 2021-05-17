const request = require('supertest');
const app = require('../app');

describe('API POST tests', () => {
	it('POST test for login with user tester1', async done => {
		const res = await request(app)
			.post('/auth/login')
			.send({
				"username": "tester1",
				"password": "password123"
			});
			expect(res.statusCode).toEqual(200)
			expect(res.body.id).toEqual('5ebe57b1e5fbebaec750b94f')
			expect(res.body.username).toEqual('tester1')
			done()
	});

	it('POST test for login with user tester2', async done => {
		const res = await request(app)
			.post('/auth/login')
			.send({
				"username": "tester2",
				"password": "password123"
			});
			expect(res.statusCode).toEqual(200)
			expect(res.body.id).toEqual('5ebe5937198b37aee15e3295')
			expect(res.body.username).toEqual('tester2')
			done()
	});

	it('POST test for login with user tester3', async done => {
		const res = await request(app)
			.post('/auth/login')
			.send({
				"username": "tester3",
				"password": "password123"
			});
			expect(res.statusCode).toEqual(200)
			expect(res.body.id).toEqual('5ebe59c8be01c2aef21c2668')
			expect(res.body.username).toEqual('tester3')
			done()
	});

	it('POST test for login with user tester4 (no available user!)', async done => {
		const res = await request(app)
			.post('/auth/login')
			.send({
				"username": "tester4",
				"password": "password123"
			});
			expect(res.statusCode).toEqual(404)
			done()
	});
});
