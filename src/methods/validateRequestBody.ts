import { TNewUser } from '../types';

export const validateRequestBody = (dataNewUser: string) => {
  const { name, age, hobbies }: TNewUser = JSON.parse(dataNewUser);
  const typesMatch: boolean[] = [
    typeof name === 'string',
    typeof age === 'number',
    (Array.isArray(hobbies) && hobbies.every((el) => typeof el === 'string')) ||
      typeof hobbies === 'string',
  ];
  const fieldsFilled = name && age && hobbies;

  if (typesMatch.every((el) => el) && fieldsFilled) {
    return { name, age, hobbies };
  }
  return false;
};
