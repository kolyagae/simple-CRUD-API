import { users } from './data/users.js';
import { TServerMethod, TUsers } from './types.js';

const findAllUsers = (): Promise<TUsers> => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getAllUsers: TServerMethod = async (_request, response) => {
  try {
    const users = await findAllUsers();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};
