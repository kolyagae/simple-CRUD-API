import { IncomingMessage } from 'http';
import { users } from './data/users.js';
import { findUserById } from './findById.js';
import { getRequestBody } from './getRequestBody.js';
import { TNewUser, TServerMethodWithId, TUser } from './types.js';
import { validateRequestBody } from './validateRequestBody.js';

const update = async (user: TUser, request: IncomingMessage) => {
  const data = await getRequestBody(request);
  return new Promise((resolve, reject) => {
    const fields = validateRequestBody(data);
    if (fields) {
      const { name, age, hobbies } = fields;
      const updateData: TNewUser = {
        name,
        age,
        hobbies,
      };
      const index = users.indexOf(user);
      const id = user.id;
      users[index] = { id, ...updateData };
      resolve(users[index]);
    } else {
      reject();
    }
  });
};

export const updateDataUser: TServerMethodWithId = async (
  request,
  response,
  id
) => {
  try {
    const user = await findUserById(id);
    if (user) {
      const updateUser = await update(user, request).catch(() => {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(
          JSON.stringify({
            message:
              'The request body does not contain required fields or the fields contain incorrect types',
          })
        );
      });
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(updateUser));
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({ message: 'Record with this id does not exist' })
      );
    }
  } catch {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'UserId is invalid (not uuid)' }));
  }
};
