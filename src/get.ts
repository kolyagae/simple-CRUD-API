import { users } from './data/users.js';
import { TGetUserById, TServer, TUser, TUsers } from './types.js';
import { validate as uuidValidate } from 'uuid';

const findAllUsers = (): Promise<TUsers> => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getAllUsers: TServer = async (_request, response) => {
  try {
    const users = await findAllUsers();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

const findUserById = (id: string): Promise<TUser> => {
  return new Promise((resolve, reject) => {
    const user = users.find((el) => el.id === id);
    if (user) {
      resolve(user);
    } else {
      reject();
    }
  });
};

export const getUserById: TGetUserById = async (_request, response, id) => {
  try {
    const validUuid = uuidValidate(id);
    if (validUuid) {
      const user = await findUserById(id);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'UserId is invalid (not uuid)' }));
    }
  } catch {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({ message: 'Record with this id does not exist' })
    );
  }
};
