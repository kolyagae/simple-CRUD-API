import { TServerMethod } from '../../types.js';
import { findAllUsers } from './findAll.js';

export const getAllUsers: TServerMethod = async (_request, response) => {
  try {
    const users = await findAllUsers();
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};
