const database = require("../models");

const { hash } = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

class UsuarioService {
  async cadastrar(dto) {
    // Objeto (dto) recebe todos os dados
    const usuario = await database.usuarios.findOne({
      where: { email: dto.email },
    });

    if (usuario) {
      throw new Error("Usuário já cadastrado!");
    }

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuidv4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
        telefones: dto.telefones.map((telefone) => ({
          numero: telefone.numero,
          ddd: telefone.ddd,
        })),
      });

      return novoUsuario;
    } catch (erro) {
      console.error("Erro ao cadastrar usuário:", erro);
      throw new Error("Erro ao cadastrar usuário");
    }
  }
  async buscarTodosUsuarios() {
    const usuarios = await database.usuarios.findAll();
    return usuarios;
  }
  async buscarUsuarioPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id,
      },
    });
    if (!usuario) {
      throw new Error("Usuario informado não cadastrado!");
    }
    return usuario;
  }
  async editarUsuario(dto) {
    const usuario = await this.buscarUsuarioPorId(dto.id);
    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }
  async deletarUsuario(id) {
    await this.buscarUsuarioPorId(id);
    try {
      await database.usuarios.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

module.exports = UsuarioService;
