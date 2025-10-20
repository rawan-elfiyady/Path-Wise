module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define("Quiz", {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        numOfQuestions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        entityType: {
            type: DataTypes.ENUM("Track", "Topic"),
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Quiz.associate = (models) => {
        Quiz.belongsTo(models.Topic,{
            foreignKey: "entityId",
            constraints: false, 
            as: "topic",
        });

        Quiz.belongsTo(models.Track,{
            foreignKey: "entityId",
            constraints: false, 
            as: "track",
        });

        Quiz.hasMany(models.Question, {
            foreignKey: "quizId",
            as: "questions",
            onDelete: "CASCADE",
        });

        Quiz.belongsToMany(models.User, {
            through: "QuizGrade",
            foreignKey: "quizId",
        });
    };

    return Quiz;
}