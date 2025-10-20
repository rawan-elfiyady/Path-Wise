module.exports = (sequelize, DataTypes) => {
    const ProjectIdea = sequelize.define("ProjectIdea", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM("Advanced", "Intermediate", "Beginner"),
            defaultValue: "Beginner",
            allowNull:false,
        }
    });
    return ProjectIdea;
}