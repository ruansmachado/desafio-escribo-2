const UsuarioService = require("../services/usuarioService");
const { format } = require("date-fns");

const usuarioService = new UsuarioService();

class UsuarioController {
  static formatarUsuario(usuario) {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefones: usuario.telefones.map((telefone) => ({
        ddd: telefone.ddd,
        numero: telefone.numero,
      })),
      createdAt: format(new Date(usuario.createdAt), "dd/MM/yyyy HH:mm"),
      updatedAt: format(new Date(usuario.updatedAt), "dd/MM/yyyy HH:mm"),
      ultimo_login: format(new Date(usuario.ultimo_login), "dd/MM/yyyy HH:mm"),
    };
  }

  static async cadastrar(req, res) {
    const { nome, email, senha, telefones } = req.body;
    console.log("Valor de email:", email);
    try {
      const usuario = await usuarioService.cadastrar({
        nome,
        email,
        senha,
        telefones,
      });

      res.status(201).send(UsuarioController.formatarUsuario(usuario));
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodosUsuarios(req, res) {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    const usuariosFormatados = usuarios.map((usuario) =>
      UsuarioController.formatarUsuario(usuario)
    );

    res.status(200).json(usuariosFormatados);
  }

  static async buscarUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.buscarUsuarioPorId(id);
      res.status(200).json(UsuarioController.formatarUsuario(usuario));
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const usuario = await usuarioService.editarUsuario({ id, nome, email });
      res.status(200).json(UsuarioController.formatarUsuario(usuario));
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletarUsuario(id);
      res.status(200).send({ message: "Usuario deletado com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
