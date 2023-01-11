import { users } from './data/users.js';
import { v4 as uuidv4 } from 'uuid';
import {
  TAddIdForNewUser,
  TGetDataNewUser,
  TNewUser,
  TServer,
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

export const createUser: TServer = async (request, response) => {
  try {
    const dataNewUser = await getDataNewUser(request);
    const { name, age, hobbies }: TNewUser = JSON.parse(dataNewUser);

    if (name && age && hobbies) {
      const user: TNewUser = {
        name,
        age,
        hobbies,
      };

      const newUser = await addIdForNewUser(user);
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newUser));
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({
          message: 'Request body does not contain required fields',
        })
      );
    }
  } catch (error) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        message: 'The request body is filled incorrectly',
      })
    );
  }
};
