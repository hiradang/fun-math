module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role_id: {
          type: DataTypes.STRING.BINARY,
          allowNull: false
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
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    return User;
  };
  