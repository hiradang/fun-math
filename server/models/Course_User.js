module.exports = (sequelize, DataTypes) => {
  const Course_User = sequelize.define(
    'Course_User',
    {
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_chapter: {
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
    },
    {
      timestamps: false,
    }
  );
  Course_User.associate = (models) => {
    Course_User.belongsTo(models.Course, {
      onDelete: 'cascade',
      foreignKey: 'course_id',
    });
    Course_User.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: 'username',
    });
    Course_User.belongsTo(models.Chapter, {
      onDelete: 'cascade',
      foreignKey: 'current_chapter',
    });
  };
  return Course_User;
};
