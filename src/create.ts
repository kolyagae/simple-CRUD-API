import { users } from './data/users.js';
import { v4 as uuidv4 } from 'uuid';
import { TAddIdForNewUser, TNewUser, TServerMethod, TUser } from './types.js';
import { getRequestBody } from './getRequestBody.js';
import { validateRequestBody } from './validateRequestBody.js';

const addIdForNewUser: TAddIdForNewUser = (newUser) => {
  return new Promise((resolve) => {
    const user: TUser = {
      id: uuidv4(),
      ...newUser,
    };
    users.push(user);
    resolve(user);
  });
};

export const createUser: TServerMethod = async (request, response) => {
  try {
    const newData = await getRequestBody(request);
    const fields = validateRequestBody(newData);

    if (fields) {
      const { name, age, hobbies } = fields;
      const user: TNewUser = {
        name,
        age,
        hobbies,
      };

      const newUser = await addIdForNewUser(user);
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newUser));
    } else {
      throw new Error();
    }
  } catch {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        message:
          'The request body does not contain required fields or the fields contain incorrect types',
      })
    );
  }
};
