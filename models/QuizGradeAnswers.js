module.exports = (sequelize, DataTypes) => {
    const QuizGradeAnswer = sequelize.define("QuizGradeAnswer", {
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        rightAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    QuizGradeAnswer.associate = (models) => {
        QuizGradeAnswer.belongsTo(models.QuizGrade, {
            foreignKey: "quizGardeId",
            as: "quizGrade",
        });

        QuizGradeAnswer.belongsTo(models.Question, {
            foreignKey: "questionId",
            as: "Question",
        });
    };

    return QuizGradeAnswer;
}