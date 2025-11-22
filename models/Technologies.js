
module.exports = (sequelize, DataTypes) => {
    const Technology = sequelize.define("Technology", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crashCourse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Technology.associate = (models) => {
        Technology.belongsToMany(models.Track, {
            through: "TrackTechnologies",
            foreignKey: "technologyId",
            as: "technology"
        });

        Technology.hasMany(models.Roadmap, {
        foreignKey: "entityId",
        constraints: false,
        scope: {
            entityType: "Technology",
        },
        as: "roadmaps",
        });
    };

    return Technology;
}