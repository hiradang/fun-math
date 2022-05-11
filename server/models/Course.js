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
    current_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_all_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_learnt_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    total_exp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Course;
};
