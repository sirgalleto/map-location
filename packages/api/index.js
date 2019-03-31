const server = require('./server');

const port = 3000;

server.listen(port, () => {
  console.info(`App listennin on port ${port}`);
});
