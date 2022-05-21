module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    chapter_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chapter_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_all_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Chapter.associate = (models) => {
    Chapter.belongsTo(models.Course, {
      onDelete: 'cascade',
      foreignKey: 'course_id',
    });
    Chapter.hasMany(models.Question, {
      onDelete: 'cascade',
      foreignKey: 'chapter_id',
    });
  };
  return Chapter;
};
