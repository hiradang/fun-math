module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapter_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Course.associate = (models) => {
    Course.hasMany(models.Chapter, {
      onDelete: 'cascade',
      foreignKey: 'course_id',
    });
  };
  return Course;
};
