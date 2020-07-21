const { Sequelize, DataTypes, Models } = require('sequelize');
const sequelize = new Sequelize('spotify', 'postgres', 'password', {
  host: 'ec2-54-153-116-222.us-west-1.compute.amazonaws.com',
  dialect: 'postgres',
})

try {
  sequelize.authenticate();
  console.log('Connection to PostgreSQL database has been established successfully...');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;












