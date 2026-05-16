'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔥 remove composite primary key or unique constraint
    await queryInterface.removeConstraint(
      'UserContributions',
      'UserContributions_pkey'
    );

    // ✅ add normal auto id primary key instead
    await queryInterface.addColumn('UserContributions', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // rollback if needed
  }
};