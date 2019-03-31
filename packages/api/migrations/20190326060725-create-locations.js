module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    long: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    isOpen: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Locations'),
};
