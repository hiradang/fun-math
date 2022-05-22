module.exports = (sequelize, DataTypes) => {
  const Chapter_User = sequelize.define('Chapter_User', {
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });
  Chapter_User.associate = (models) => {
    Chapter_User.belongsTo(models.Chapter, {
      onDelete: 'cascade',
      foreignKey: 'chapter_id',
    });
  };
  return Chapter_User;
};
