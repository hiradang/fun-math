module.exports = (sequelize, DataTypes) => {
  const MultiChoice_Question = sequelize.define(
    'MultiChoice_Question',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answers: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      format_question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  MultiChoice_Question.associate = (models) => {
    MultiChoice_Question.belongsTo(models.Question, {
      onDelete: 'cascade',
      foreignKey: 'question_id',
    });
  };
  return MultiChoice_Question;
};
