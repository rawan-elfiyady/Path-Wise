module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    degree: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    });

    Question.associate = (models) => {
        Question.belongsTo(models.Quiz, {
            foreignKey: "quizId",
            as: "quiz"
        });

        Question.hasMany(models.Choice, {
            foreignKey: "questionId",
            as: "choices",
            onDelete: "CASCADE",
        });

        Question.hasMany(models.QuizGradeAnswer, {
            foreignKey: "questionId",
            as: 'QuestionAnswers',
            onDelete: "SET NULL",
        })
    };

    return Question;
}