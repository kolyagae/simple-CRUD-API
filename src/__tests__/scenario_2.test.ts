import request from 'supertest';
import server from '../app';

const newObj = {
  name: 'John',
  age: 25,
};

const update = {
  name: 'Ben',
  age: 25,
  hobbies: ['Basketball'],
};

describe('Second scenario', () => {
  afterAll(() => {
    server.close();
  });

  const notUuid = 'notUuid-1Uuid-2notUuid';
  const messageNotUuid = { message: 'UserId is invalid (not uuid)' };
  const BAD_REQUEST = 400;

  it('Should answer with status code 400 and corresponding message if request body does not contain required fields for request POST api/users', async () => {
    const res = await request(server)
      .post('/api/users')
      .send(newObj)
      .expect(BAD_REQUEST);

    const createdObj = res.body;

    expect(createdObj).toEqual({
      message:
        'The request body does not contain required fields or the fields contain incorrect types',
    });
  });

  it('Should answer with status code 400 and corresponding message if userId is invalid (not uuid) for request GET api/users/{userId}', async () => {
    await request(server)
      .get(`/api/users/${notUuid}`)
      .expect(BAD_REQUEST, messageNotUuid);
  });

  it('Should answer with status code 400 and corresponding message if userId is invalid (not uuid) for request PUT api/users/{userId}', async () => {
    await request(server)
      .put(`/api/users/${notUuid}`)
      .send(update)
      .expect(BAD_REQUEST, messageNotUuid);
  });

  it('Should answer with status code 400 and corresponding message if userId is invalid (not uuid) for request DELETE api/users/{userId}', async () => {
    await request(server)
      .delete(`/api/users/${notUuid}`)
      .expect(BAD_REQUEST, messageNotUuid);
  });
});
