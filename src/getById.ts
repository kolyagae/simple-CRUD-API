import { TServerMethodWithId } from './types.js';
import { findUserById } from './findById.js';

export const getUserById: TServerMethodWithId = async (
  _request,
  response,
  id
) => {
  try {
    const user = await findUserById(id);
    if (user) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
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
