import request from 'supertest';
import server from '../app';

const newObj = {
  name: 'John',
  age: 25,
  hobbies: ['Basketball'],
};

const update = {
  name: 'Ben',
  age: 25,
  hobbies: ['Basketball'],
};

describe('Third scenario', () => {
  afterAll(() => {
    server.close();
  });

  const userId = '36f77ef5-310c-4a78-9268-1be2ba368a72';
  const STATUS_OK = 200;
  const STATUS_CREATED = 201;
  const NOT_FOUND = 404;
  const messageAboutNotExist = {
    message: 'Record with this id does not exist',
  };

  it('Should respond with an array containing all created objects on request GET api/users', async () => {
    await request(server)
      .post('/api/users')
      .send(newObj)
      .expect(STATUS_CREATED);
    await request(server)
      .post('/api/users')
      .send(newObj)
      .expect(STATUS_CREATED);
    await request(server)
      .post('/api/users')
      .send(newObj)
      .expect(STATUS_CREATED);

    const res = await request(server).get('/api/users').expect(STATUS_OK);

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        ...newObj,
      },
      {
        id: expect.any(String),
        ...newObj,
      },
      {
        id: expect.any(String),
        ...newObj,
      },
    ]);
  });

  it('should respond with a 404 status code and appropriate human-friendly message to requests to non-existent endpoints', async () => {
    await request(server)
      .get('/some-non/existing/resource')
      .expect(NOT_FOUND, { message: 'Invalid data in request' });
  });

  it("Server should answer with status code 404 and corresponding message if record with id doesn't exist for request GET api/users/{userId}", async () => {
    await request(server)
      .get(`/api/users/${userId}`)
      .expect(NOT_FOUND, messageAboutNotExist);
  });

  it("Server should answer with status code 404 and corresponding message if record with i  doesn't exist for request PUT api/users/{userId}", async () => {
    await request(server)
      .put(`/api/users/${userId}`)
      .send(update)
      .expect(NOT_FOUND, messageAboutNotExist);
  });

  it("Server should answer with status code 404 and corresponding message if record with i  doesn't exist for request DELETE api/users/{userId}", async () => {
    await request(server)
      .delete(`/api/users/${userId}`)
      .expect(NOT_FOUND, messageAboutNotExist);
  });
});
