import { users } from './data/users.js';
import { v4 as uuidv4 } from 'uuid';
import {
  TAddIdForNewUser,
  TGetDataNewUser,
  TNewUser,
  TServerMethod,
  TUser,
} from './types.js';

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

const getDataNewUser: TGetDataNewUser = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      request.on('data', (chunk: string) => {
        body += chunk.toString();
      });

      request.on('end', async () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const validateNewUserFields = (dataNewUser: string) => {
  const { name, age, hobbies }: TNewUser = JSON.parse(dataNewUser);
  const typesMatch: boolean[] = [
    typeof name === 'string',
    typeof age === 'number',
    Array.isArray(hobbies) && hobbies.every((el) => typeof el === 'string'),
  ];
  const fieldsFilled = name && age && hobbies;

  if (typesMatch.every((el) => el) && fieldsFilled) {
    return { name, age, hobbies };
  }
  return false;
};

export const createUser: TServerMethod = async (request, response) => {
  try {
    const dataNewUser = await getDataNewUser(request);
    const fields = validateNewUserFields(dataNewUser);

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
  } catch (error) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        message:
          'The request body does not contain required fields or the fields contain incorrect types',
      })
    );
  }
};
