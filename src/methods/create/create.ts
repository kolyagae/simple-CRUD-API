import { TNewUser, TServerMethod } from '../../types';
import { getRequestBody } from '../getRequestBody';
import { validateRequestBody } from '../validateRequestBody';
import { addIdForNewUser } from './addId';

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
