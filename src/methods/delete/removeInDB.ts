import { TUser } from '../../types';
import { users } from '../../data/users';

export const remove = (user: TUser): Promise<void> => {
  return new Promise((resolve) => {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    resolve();
  });
};
