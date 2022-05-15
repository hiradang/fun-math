module.exports = (sequelize, DataTypes) => {
  const Type_Question = sequelize.define('Type_Question', {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    format_question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Type_Question.associate = (models) => {
    Type_Question.belongsTo(models.Question, {
      onDelete: 'cascade',
      foreignKey: 'question_id',
    });
  };
  return Type_Question;
};
