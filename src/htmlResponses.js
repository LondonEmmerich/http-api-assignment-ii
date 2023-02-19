const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

//the structure for every response
const returnResponse = (request, response, data, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(data);
  response.end();
};

const getIndex = (request, response) => {
  returnResponse(request, response, index, 200, 'text/html');
};

const getStyle = (request, response) => {
  returnResponse(request, response, style, 200, 'text/css');
};

//a default response for files that don't exist
const notExist = (request, response) => {
  returnResponse(request, response, index, 404, 'text/html');
};

module.exports = {
  getIndex,
  getStyle,
  notExist,
};
