import { TServerMethodWithId } from '../../types';
import { findUserById } from '../findById';
import { remove } from './removeInDB';

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
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({ message: 'Record with this id does not exist' })
      );
    }
  } catch {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'UserId is invalid (not uuid)' }));
  }
};
