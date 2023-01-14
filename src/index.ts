import * as dotenv from 'dotenv';
dotenv.config();
import http from 'node:http';
import { createUser } from './create.js';
import { deleteUser } from './delete.js';
import { getAllUsers } from './getAll.js';
import { getUserById } from './getById.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

const server = http.createServer();

server.on('request', (request, response) => {
  const { method, url } = request;
  if (method === 'GET' && url === '/api/users') {
    getAllUsers(request, response);
  } else if (
    method === 'GET' &&
    url?.startsWith('/api/users') &&
    url?.split('/').length === 4
  ) {
    const id = url.split('/')[3];
    getUserById(request, response, id);
  } else if (method === 'POST' && url === '/api/users') {
    createUser(request, response);
  } else if (
    method === 'DELETE' &&
    url?.startsWith('/api/users') &&
    url?.split('/').length === 4
  ) {
    const id = url.split('/')[3];
    deleteUser(request, response, id);
  } else {
    response.writeHead(404, { 'Content-type': 'application/json' });
    response.end(JSON.stringify({ message: 'Invalid data in request' }));
  }
});

server.listen(PORT, +HOST, () => {
  console.log(`Server is running at: http://${HOST}:${PORT}`);
});
