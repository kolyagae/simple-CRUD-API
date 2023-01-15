import { TGetRequestBody } from '../types.js';

export const getRequestBody: TGetRequestBody = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      request.on('data', (chunk: string) => {
        body += chunk.toString();
      });

      request.on('end', async () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};
