const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// process the response from the client
const processResponse = (request, response) => {
  const type = request.method;

  // if its a head request, go to the url
  if (type === 'HEAD') {
    switch (request.url) {
      case '/getUsers?':
      case '/getUsers':
        jsonHandler.getUsersMeta(request, response);
        break;
      default:
        jsonHandler.notExistMeta(request, response);
        break;
    }
  // if it's a post request, go to the url
  } else if (type === 'POST') {
    switch (request.url) {
      case '/addUser':
      case '/addUser?':
        jsonHandler.addUser(request, response);
        break;
      default:
        jsonHandler.notExistMeta(request, response);
        break;
    }
  // if its not one of those, assume its a get request and go the url
  } else {
    switch (request.url) {
      case '/':
        htmlHandler.getIndex(request, response);
        break;
      case '/client.html':
        htmlHandler.getIndex(request, response);
        break;
      case '/style.css':
        htmlHandler.getStyle(request, response);
        break;
      case '/getUsers?':
      case '/getUsers':
        jsonHandler.getUsers(request, response);
        break;
      default:
        jsonHandler.notExist(request, response);
        break;
    }
  }
};

// create the server
http.createServer(processResponse).listen(port, () => {

});
