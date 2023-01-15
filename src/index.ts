import * as dotenv from 'dotenv';
dotenv.config();
import http from 'node:http';
import { createUser } from './methods/create/create.js';
import { deleteUser } from './methods/delete/delete.js';
import { getAllUsers } from './methods/getAll/getAll.js';
import { getUserById } from './methods/getById/getById.js';
import { updateDataUser } from './methods/update/update.js';

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
    method === 'PUT' &&
    url?.startsWith('/api/users') &&
    url?.split('/').length === 4
  ) {
    const id = url.split('/')[3];
    updateDataUser(request, response, id);
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
