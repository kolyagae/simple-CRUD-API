import request from 'supertest';
import server from '../app';
import { TUser } from '../types';

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

describe('First scenario', () => {
  afterAll(() => {
    server.close();
  });

  const STATUS_OK = 200;
  const STATUS_CREATED = 201;
  const STATUS_NO_CONTENT = 204;
  const NOT_FOUND = 404;

  it('Should answer an empty array and status code 200 on the first GET request to "api/users" after starting the server', async () => {
    await request(server).get('/api/users').expect(STATUS_OK, []);
  });

  let createdObj: TUser | null = null;

  it('Should created a new object and answered status code 201 with newly created entry upon api/users POST request)', async () => {
    const res = await request(server)
      .post('/api/users')
      .send(newObj)
      .expect(STATUS_CREATED);

    createdObj = res.body;

    expect(createdObj).toEqual({
      id: expect.any(String),
      ...newObj,
    });
  });

  it('Should return created object and answered status code 200 by id to GET request api/users/{userId}', async () => {
    if (createdObj) {
      const id = createdObj.id;
      await request(server)
        .get(`/api/users/${id}`)
        .expect(STATUS_OK, createdObj);
    }
  });

  it('Should update created record and respond with status code 200 and updated object with same id to PUT request api/users/{userId}', async () => {
    if (createdObj) {
      const id = createdObj.id;
      const res = await request(server)
        .put(`/api/users/${id}`)
        .send(update)
        .expect(STATUS_OK);

      expect(res.body).toEqual({
        id: createdObj.id,
        ...update,
      });
    }
  });

  it('Should delete the created object by id and respond with status code 204 on request DELETE api/users/{userId}', async () => {
    if (createdObj) {
      const id = createdObj.id;
      await request(server)
        .delete(`/api/users/${id}`)
        .expect(STATUS_NO_CONTENT);
    }
  });

  it('Should respond with a status code of 404 and a message that there is no such object when we try to get the object that was deleted by the request GET api/users/{userId}', async () => {
    if (createdObj) {
      const id = createdObj.id;
      await request(server)
        .get(`/api/users/${id}`)
        .expect(NOT_FOUND, { message: 'Record with this id does not exist' });
    }
  });
});
