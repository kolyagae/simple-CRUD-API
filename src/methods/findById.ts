import { users } from '../data/users';
import { TUser } from '../types';
import { validate as uuidValidate } from 'uuid';

export const findUserById = (id: string): Promise<TUser | undefined> => {
  return new Promise((resolve, reject) => {
    const validUuid = uuidValidate(id);

    if (validUuid) {
      const user = users.find((el) => el.id === id);
      resolve(user);
    } else {
      reject();
    }
  });
};
