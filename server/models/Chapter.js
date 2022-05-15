module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chapter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Chapter.associate = (models) => {
    Chapter.belongsTo(models.Course, {
      onDelete: 'cascade',
      foreignKey: 'course_id',
    });
  };
  return Chapter;
};
