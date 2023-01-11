import http from 'node:http';

export type TServer = {
  (
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    }
  ): void;
};

export type TGetUserById = {
  (
    request: http.IncomingMessage,
    response: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
    id: string
  ): void;
};

export type TNewUser = {
  name: string;
  age: number;
  hobbies: string[];
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
