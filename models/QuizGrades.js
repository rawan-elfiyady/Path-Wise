module.exports = (sequelize, DataTypes) => {
    const QuizGrade = sequelize.define("QuizGrade", {
        grade:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM("Passed", "Failed"),
            allowNull: false,
        },
        
    });

    QuizGrade.associate = (models) => {
        QuizGrade.hasMany(models.QuizGradeAnswer, {
            foreignKey: "quizGradeId",
            as: "answers",
            onDelete: "CASCADE"
        })
    };

    return QuizGrade;
} 