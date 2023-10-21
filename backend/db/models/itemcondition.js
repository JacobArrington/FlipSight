'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCondition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemCondition.hasMany(models.Item,{ foreignKey})
    }
  }
  ItemCondition.init({
    conditionName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemCondition',
  });
  return ItemCondition;
};
