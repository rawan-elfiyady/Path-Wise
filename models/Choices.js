module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define("Choice", {
        choice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    Choice.associate = (models) => {
        Choice.belongsTo(models.Question, {
            foreignKey: "questionId",
            as: "question"
        });
    };

    return Choice;
}