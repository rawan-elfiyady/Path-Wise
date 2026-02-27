module.exports = (sequelize, DataTypes) => {
    const QuizGrade = sequelize.define("QuizGrade", {
        grade: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('grade');
                return rawValue === null ? null : parseFloat(rawValue);
            }
        },
        status: {
            type: DataTypes.ENUM("Passed", "Failed"),
            defaultValue: "Failed",
            allowNull: false,
        },
    });

    QuizGrade.associate = (models) => {
        QuizGrade.belongsTo(models.Quiz, {
            foreignKey: "quizId",
            onDelete: "CASCADE",
        });

        QuizGrade.belongsTo(models.TopicProgress, {
            foreignKey: "topicProgressId",
            onDelete: "CASCADE",
        });

        QuizGrade.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });

        QuizGrade.hasMany(models.QuizGradeAnswer, {
            foreignKey: "quizGradeId",
            as: "answers",
            onDelete: "CASCADE",
        });
    };

    return QuizGrade;
};
