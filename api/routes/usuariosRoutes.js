const { Router } = require("express");

const UsuarioController = require("../controllers/usuarioController");
const autenticado = require("../middleware/autenticado");

const router = Router();

router.use(autenticado);

router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.buscarTodosUsuarios)
  .get("/usuarios/id/:id", UsuarioController.buscarUsuarioPorId)
  .put("/usuarios/id/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

router.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = router;
