module.exports = (sequelize, DataTypes) => {
    const UserExperience = sequelize.define("UserExperience", {
        company: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    UserExperience.associate = (models) => {
        UserExperience.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
    };

    return UserExperience;
}
