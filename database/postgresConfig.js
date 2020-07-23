const { Sequelize, DataTypes, Models } = require('sequelize');
const sequelize = new Sequelize('sdc', 'postgres', 'password', {
  host: 'ec2-52-53-215-43.us-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  logging: false,
})

// try {
//   sequelize.authenticate();
//   console.log('Connection to PostgreSQL database has been established successfully...');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize;












