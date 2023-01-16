import { users } from '../../data/users';
import { TUsers } from '../../types';

export const findAllUsers = (): Promise<TUsers> => {
  return new Promise((resolve) => {
    resolve(users);
  });
};
