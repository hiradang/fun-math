module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Question.associate = (models) => {
    Question.belongsTo(models.Chapter, {
      onDelete: 'cascade',
      foreignKey: 'chapter_id',
    });
  };

  Question.associate = (models) => {
    Question.hasMany(models.MultiChoice_Question, {
      onDelete: 'cascade',
      foreignKey: 'question_id',
    });
  };

  Question.associate = (models) => {
    Question.hasMany(models.Type_Question, {
      onDelete: 'cascade',
      foreignKey: 'question_id',
    });
  };
  return Question;
};
