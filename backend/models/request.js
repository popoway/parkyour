module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    email: DataTypes.STRING,
    parkName: DataTypes.STRING,
    fulfilled: DataTypes.BOOLEAN
  })

  return Request;
}