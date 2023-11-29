const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ["id", "email", "senha"],
      where: {
        email: dto.email,
      },
    });
    if (!usuario) {
      throw new Error("Usuário não cadastrado");
    }
    const senhasIguais = await compare(dto.senha, usuario.senha);
    if (!senhasIguais) {
      throw new Error("Usuario e/ou senha inválido");
    }

    const accessToken = sign(
      { id: usuario.id, email: usuario.email },
      jsonSecret.secret,
      {
        expiresIn: 1800, //Levará 30 minutos para o token expirar
      }
    );
    return { accessToken };
  }
}

module.exports = AuthService;