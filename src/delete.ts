import { TServerMethodWithId, TUser } from './types.js';
import { findUserById } from './findById.js';
import { users } from './data/users.js';

const remove = (user: TUser): Promise<void> => {
  return new Promise((resolve) => {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    resolve();
  });
};

export const deleteUser: TServerMethodWithId = async (
  _request,
  response,
  id
) => {
  try {
    const user = await findUserById(id);
    if (user) {
      remove(user);
      response.writeHead(204, { 'Content-Type': 'application/json' });
      response.end();
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
