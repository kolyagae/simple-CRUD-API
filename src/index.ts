import server from './app';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

server.listen(PORT, +HOST, () => {
  console.log(`Server is running at: http://${HOST}:${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit());
});
