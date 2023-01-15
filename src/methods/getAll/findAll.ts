import { users } from '../../data/users.js';
import { TUsers } from '../../types.js';

export const findAllUsers = (): Promise<TUsers> => {
  return new Promise((resolve) => {
    resolve(users);
  });
};
