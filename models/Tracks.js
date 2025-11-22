module.exports = (sequelize, DataTypes) => {
    const Track = sequelize.define("Track", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        keyConcepts: {
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

    Track.associate = (models) => {
        Track.belongsToMany(models.Technology, {
            through: "TrackTechnologies",
            foreignKey: "trackId",
            as: "technologies",
        });

        Track.belongsToMany(models.Region, {
            through: "MarketDemand",
            foreignKey: "trackId",
        });
        
        Track.hasMany(models.Roadmap, {
            foreignKey: "entityId",
            constraints: false,
            scope: {
                entityType: "Track", 
            },
            as: "roadmaps",
        });

        Track.hasMany(models.Quiz, {
            foreignKey: "entityId",
            constraints: false,
            scope: {
                entityType: "Track", 
            },
            as: "Quizzes",
        });

        Track.hasMany(models.ProjectIdea, {
            foreignKey: "trackId",
            as: "ProjectIdeas",
            onDelete: "SET NULL",
        });
    };

    return Track;
}