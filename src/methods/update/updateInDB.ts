import { IncomingMessage } from 'http';
import { users } from '../../data/users';
import { getRequestBody } from '../getRequestBody';
import { TNewUser, TUser } from '../../types';
import { validateRequestBody } from '../validateRequestBody';

export const update = async (user: TUser, request: IncomingMessage) => {
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
