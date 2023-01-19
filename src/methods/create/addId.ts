import { users } from '../../data/users';
import { v4 as uuidv4 } from 'uuid';
import { TAddIdForNewUser, TUser } from '../../types';

export const addIdForNewUser: TAddIdForNewUser = (newUser) => {
  return new Promise((resolve) => {
    const user: TUser = {
      id: uuidv4(),
      ...newUser,
    };
    users.push(user);
    resolve(user);
  });
};
