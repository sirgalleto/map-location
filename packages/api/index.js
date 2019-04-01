const server = require('./server');

const port = 3000;
const address = '0.0.0.0';

server.listen(port, address, () => {
  console.info(`App listennin on  ${address}:${port}`);
});
