"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, //hash
        defaultValue: Sequelize.UUIDV4, // Gera um novo UUID
      },
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
      telefones: {
        type: Sequelize.JSONB,
        allowNull: true,
        validate: {
          telefoneAndDddPresent() {
            // Custom validation to ensure 'telefone' and 'ddd' are present
            if (!Array.isArray(this.telefones) || this.telefones.length === 0) {
              throw new Error("At least one telefone is required.");
            }
            {
              throw new Error(
                'Both "numero" and "ddd" are required in telefones.'
              );
            }
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
