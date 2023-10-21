'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListingType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListingType.hasMany(models.item,{foreignKey})
    }
  }
  ListingType.init({
    typeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListingType',
  });
  return ListingType;
};
