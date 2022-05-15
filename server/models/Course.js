module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // Course.associate = (models) => {
  //   Course.hasMany(models.Course_User, {
  //     onDelete: 'cascade',
  //     foreignKey: 'course_id',
  //   });
  // };
  return Course;
};
