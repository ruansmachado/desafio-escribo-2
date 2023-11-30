const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

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
      createdAt: usuario.createdAt,
      updateAt: usuario.updatedAt,
      ultimo_login: usuario.ultimo_login,
      accessToken,
    };
  }
}

module.exports = AuthService;
