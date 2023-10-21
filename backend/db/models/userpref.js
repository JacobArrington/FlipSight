'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPref extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPref.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  UserPref.init({
    userId: DataTypes.INTEGER,
    theme: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPref',
  });
  return UserPref;
};
