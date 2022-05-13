module.exports = (sequelize, DataTypes) => {
  const Chapter_User = sequelize.define('Chapter_User', {
    chapter_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    chapter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Chapter_User.associate = (models) => {
    Chapter_User.belongsTo(models.Course, {
      onDelete: 'cascade',
      foreignKey: 'course_id',
    });
  };
  return Chapter_User;
};
