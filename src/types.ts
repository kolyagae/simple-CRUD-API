import http from 'node:http';

export type TServerMethod = {
  (
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage>
  ): void;
};

export type TServerMethodWithId = {
  (
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage>,
    id: string
  ): void;
};

export type TNewUser = {
  name: string;
  age: number;
  hobbies: string[] | string;
};

export type TUser = {
  id: string;
} & TNewUser;

export type TUsers = TUser[];

export type TGetDataNewUser = {
  (request: http.IncomingMessage): Promise<string>;
};

export type TAddIdForNewUser = {
  (newUser: TNewUser): Promise<TNewUser>;
};
