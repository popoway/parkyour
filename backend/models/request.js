module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    email: DataTypes.STRING,
    parkName: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    fulfilled: DataTypes.BOOLEAN
  })

  return Request;
}