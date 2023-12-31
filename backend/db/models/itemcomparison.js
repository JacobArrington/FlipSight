'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemComparison extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemComparison.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      ItemComparison.hasMany(models.ComparisonItem, {
        foreignKey: 'comparisonId',
        as: 'compairsonItem'
      });
    }
  }
  ItemComparison.init({
    userId: DataTypes.INTEGER,
    comparisonName: DataTypes.STRING,
    createdDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ItemComparison',
  });
  return ItemComparison;
};
