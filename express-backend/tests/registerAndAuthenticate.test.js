const request = require('supertest');
const app = require('../app');
const controller = require("../app/controllers/auth.controller");

describe('API POST tests', () => {
    it('POST test for registering registrar1', async done => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                "username": "registrar1",
                "email": "registrar1@gmail.com",
                "password": "passwordregister"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('User was registered successfully!');
        done()
    });

    it('POST test for login with user registrar1', async done => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                "username": "registrar1",
                "password": "passwordregister"
            });
        accessToken = res.body.accessToken;
        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual('registrar1');
        expect(res.body.email).toEqual('registrar1@gmail.com');
        expect(res.body.accessToken).toBeDefined();
        done()
    });

});

afterAll(() => {
    controller.deleteTestUser({"username": "registrar1"}, {"message": "User content."})
});



