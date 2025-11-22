module.exports = (sequelize, DataTypes) => {
    const UserProjects = sequelize.define("UserProjects", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        techStack: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    UserProjects.associate = (models) => {
        UserProjects.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
    };

    return UserProjects;
}