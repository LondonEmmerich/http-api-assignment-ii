const users = { Waluigi: 19 };

//convert the users object to a json string and return it
const getUsers = (request, response) => {
  const usersString = JSON.stringify(users);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(usersString);
  response.end();
};

//return the metadata of the users
const getUsersMeta = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

//add a user to the structure and return an ok
const addUser = (request, response) => {
  let status = 201;
  //if there is not enough return, return an error
  if (!request.headers.name || !request.headers.age) {
    status = 400;
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify('Users Updated!'));
    response.end();
    return;
  }

  //if there is enough info, add it to the object and report to the user
  if (users[request.headers.name]) {
    status = 204;
  }
  users[request.headers.name] = request.headers.age;
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify('Users Updated!'));
  response.end();
};

//a catch-all for bad requests
const notExist = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify('Does not exist!'));
  response.end();
};

const notExistMeta = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notExist,
  notExistMeta,
};
