
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   Item.belongsTo(models.User, {foreignKey: 'userId'})
   Item.belongsTo(models.ItemCondition, {foreignKey: 'conditionId'})
   Item.belongsTo(models.ListingType,{foreignKey: 'listingTypeId'})
   Item.belongsToMany(models.ItemComparisons,{
    through: models.ComparisonItems,
    foreignKey: 'itemId'
   })
    }
  }
  Item.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    dateListed: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    conditionId: DataTypes.INTEGER,
    listingTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
