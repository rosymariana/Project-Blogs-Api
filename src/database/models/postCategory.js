module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: DataTypes.INTEGER,
    }, { timestamps: false });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
          as: 'posts',
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
        models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          through: PostCategory,
          foreignKey: 'postId',
          otherKey: 'categoryId',
        });
      };
  
    return PostCategory;
  };