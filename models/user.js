 'use strict';
const encrypt = require('../helpers/encrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment)
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(value, option){
        value.password = encrypt(value.password);
        value.role = "user" 
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};