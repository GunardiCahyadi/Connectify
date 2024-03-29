'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Comment)
      Post.belongsTo(models.Profile)
    }
  }
  Post.init({
    content: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((post) => {
    post.likes = 0
  })
  return Post;
};