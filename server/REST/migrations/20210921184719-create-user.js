'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            nom: {
                type: Sequelize.STRING
            },
            passwd: {
                type: Sequelize.STRING(4000)
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            foto: {
                type: Sequelize.STRING
            },
            estado: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};