"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {}
  }

  usuarios.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      telefones: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "usuarios",
      timestamps: true, //Cria marcações de tempo,
      defaultScope: {
        attributes: {
          exclude: ["senha"],
        },
      },
    }
  );
  return usuarios;
};
