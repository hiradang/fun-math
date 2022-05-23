module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_photo_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reminder_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      current_course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_exp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_new_course_noti: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_new_chapter_noti: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Course, {
      onDelete: 'cascade',
      foreignKey: 'current_course_id',
    });
  };
  return User;
};
