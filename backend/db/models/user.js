const bcrypt = require('bcryptjs');
'use strict';

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject(){
      const { firstName, lastName, id, username, email} = this
       // context will be the User instance
       return { firstName,  lastName,  id, username, email };
      
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
      
    }
    static async signup({ firstName, lastName,username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // User has many Items
      User.hasMany(models.Item, { foreignKey: 'userId' });

      // User has many ItemComparisons
      User.hasMany(models.ItemComparison, { foreignKey: 'userId' });

     User.hasOne(models.UserPref, {foreignKey: 'userId'})
    }
    
  
    
  }
  User.init({
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Cannot be an email")
          }
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{attributes:{exclude:
      ['hashedPassword','createdAt','updatedAt']
    }},
    scopes:{
      currentUser:{attributes:{exclude:['hashedPassword','createdAt','updatedAt']}
    }
    ,loginUser:{
      attributes:{}
    }
  }
  
  });
  return User;
};
