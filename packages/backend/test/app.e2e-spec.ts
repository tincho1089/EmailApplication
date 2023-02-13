import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { useContainer } from 'class-validator';

describe('E2E global tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/register (POST)(SUCCESS)', async () => {
    const mockRequest = {
      username: 'test',
      password: 'test',
      name: 'test',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequest);

    expect(response.statusCode).toBe(201);
    expect('Transaction committed successfully');
  });

  it('/auth/register (POST)(ERROR)(Missing username)', async () => {
    const mockRequest = {
      password: 'test2',
      name: 'test2',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.message).toStrictEqual(['username should not be empty']);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/register (POST)(ERROR)(Missing password)', async () => {
    const mockRequest = {
      username: 'test3',
      name: 'test3',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.message).toStrictEqual([
      'password should not be empty',
      'password must be shorter than or equal to 8 characters',
      'password must be longer than or equal to 4 characters',
    ]);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/register (POST)(ERROR)(Missing name)', async () => {
    const mockRequest = {
      username: 'test4',
      password: 'test4',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.message).toStrictEqual(['name should not be empty']);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/register (POST)(ERROR)(Empty username)', async () => {
    const mockRequest = {
      username: '',
      password: 'test7',
      name: 'test7',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.message).toStrictEqual(['username should not be empty']);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/register (POST)(ERROR)(Empty password)', async () => {
    const mockRequest = {
      username: 'test8',
      password: '',
      name: 'test8',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/register (POST)(ERROR)(Empty name)', async () => {
    const mockRequest = {
      username: 'test9',
      password: 'test9',
      name: '',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequest);

    const jRsp = JSON.parse(response.text);

    expect(jRsp.statusCode).toBe(400);
    expect(jRsp.message).toStrictEqual(['name should not be empty']);
    expect(jRsp.error).toBe('Bad Request');
    return;
  });

  it('/auth/login (POST)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test12',
      password: 'test12',
      name: 'test12',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.password,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');
  });

  it('/email/all?type=inbox (GET)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test13',
      password: 'test13',
      name: 'test13',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.username,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');

    const responseGetEmails = await request(app.getHttpServer())
      .get('/email/all?type=inbox')
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send();

    expect(responseGetEmails.statusCode).toBe(200);
    expect(responseGetEmails.body).toEqual([]);
  });

  it('/email/all?type=sent (GET)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test14',
      password: 'test14',
      name: 'test14',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.username,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');

    const responseGetEmails = await request(app.getHttpServer())
      .get('/email/all?type=inbox')
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send();

    expect(responseGetEmails.statusCode).toBe(200);
    expect(responseGetEmails.body).toEqual([]);
  });

  it('/email/all?type=removed (GET)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test15',
      password: 'test15',
      name: 'test15',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.username,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');

    const responseGetEmails = await request(app.getHttpServer())
      .get('/email/all?type=inbox')
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send();

    expect(responseGetEmails.statusCode).toBe(200);
    expect(responseGetEmails.body).toEqual([]);
  });

  it('/email/create (POST)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test16',
      password: 'test16',
      name: 'test16',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.username,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');

    const mockEmailCreate = {
      to: 'test16',
      subject: 'test16',
      body: 'test16',
    };

    const responseCreateEmail = await request(app.getHttpServer())
      .post('/email/create')
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send(mockEmailCreate);

    expect(responseCreateEmail.statusCode).toBe(201);
    expect(responseCreateEmail.body).toHaveProperty('subject', 'test16');
  });

  it('/email/update (PUT)(SUCCESS)', async () => {
    const mockRequestCreate = {
      username: 'test16',
      password: 'test16',
      name: 'test16',
    };

    const responseCreate = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRequestCreate);

    expect(responseCreate.statusCode).toBe(201);
    expect('Transaction committed successfully');

    const mockRequestLogin = {
      username: mockRequestCreate.username,
      password: mockRequestCreate.username,
    };

    const responseLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockRequestLogin);

    expect(responseLogin.statusCode).toBe(201);
    expect(responseLogin.body).toHaveProperty('jwtToken');

    const mockEmailCreate = {
      to: 'test16',
      subject: 'test16',
      body: 'test16',
    };

    const responseCreateEmail = await request(app.getHttpServer())
      .post('/email/create')
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send(mockEmailCreate);

    expect(responseCreateEmail.statusCode).toBe(201);

    const mockEmailUpdate = {
      state: 'removed',
    };

    const responseUpdateEmail = await request(app.getHttpServer())
      .put(`/email/${responseCreateEmail.body._id}/update`)
      .set('Authorization', `Bearer ${responseLogin.body.jwtToken}`)
      .send(mockEmailUpdate);

    expect(responseUpdateEmail.statusCode).toBe(200);
  });
});
