module.exports = (sequelize, DataTypes) => {
    const QuizGradeAnswer = sequelize.define("QuizGradeAnswer", {
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        rightAnswer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    QuizGradeAnswer.associate = (models) => {
        QuizGradeAnswer.belongsTo(models.QuizGrade, {
            foreignKey: "quizGradeId", 
            as: "quizGrade",
            onDelete: "CASCADE",
        });

        QuizGradeAnswer.belongsTo(models.Question, {
            foreignKey: "questionId",
            as: "question",
            onDelete: "CASCADE",
        });
    };

    return QuizGradeAnswer;
};
