const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { format } = require("date-fns");

class AuthService {
  async login(dto) {
    console.log("DTO recebido em login:", dto);
    if (!dto.email) {
      throw new Error("Email não fornecido");
    }
    const usuario = await database.usuarios.findOne({
      attributes: [
        "id",
        "email",
        "senha",
        "createdAt",
        "updatedAt",
        "ultimo_login",
      ],
      where: {
        email: dto.email,
      },
    });
    if (!usuario) {
      throw new Error("Usuário não cadastrado");
    }
    const senhasIguais = await compare(dto.senha, usuario.senha);
    if (!senhasIguais) {
      throw new Error("Usuario e/ou senha inválidos");
    }

    await usuario.update({ ultimo_login: new Date() });

    const accessToken = sign(
      { id: usuario.id, email: usuario.email },
      jsonSecret.secret,
      {
        expiresIn: 1800, //Levará 30 minutos para o token expirar
      }
    );
    return {
      id: usuario.id,
      createdAt: format(new Date(usuario.createdAt), "dd/MM/yyyy HH:mm"),
      updatedAt: format(new Date(usuario.updatedAt), "dd/MM/yyyy HH:mm"),
      ultimo_login: format(new Date(usuario.ultimo_login), "dd/MM/yyyy HH:mm"),
      accessToken,
    };
  }
}

module.exports = AuthService;
