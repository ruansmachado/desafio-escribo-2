const bodyParser = require("body-parser");

const usuario = require("./usuariosRoutes");
const auth = require("./authRoute");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuario);
};
