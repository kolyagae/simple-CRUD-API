import { findUserById } from '../findById.js';
import { TServerMethodWithId } from '../../types.js';
import { update } from './updateInDB.js';

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
