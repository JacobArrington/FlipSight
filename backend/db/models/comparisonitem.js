'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComparisonItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ComparisonItem.belongsTo(models.ItemComparison,{
        foreignKey: 'comparisonId',
        onDelete: 'CASCADE'
      })
      ComparisonItem.belongsTo(models.Item,{
        foreignKey: 'itemId',
        onDelete: 'CASCADE'
      })
    }
  }
  ComparisonItem.init({
    comparisonId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ComparisonItem',
  });
  return ComparisonItem;
};
