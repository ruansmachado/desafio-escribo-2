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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      ultimo_login: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      token: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
