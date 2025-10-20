module.exports = (sequelize, DataTypes) => {
    const Topic =  sequelize.define("Topic", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    Topic.associate = (models) => {
        Topic.belongsTo(models.Roadmap, {
            foreignKey: "roadmapId",
            as: "roadmap"
        });

        Topic.hasMany(models.Source, {
            foreignKey: "topicId",
            as: "sources",
        });

        Topic.hasMany(models.Quiz, {
            foreignKey: "entityId",
            constraints: false,
            scope: {
                entityType: "Topic", 
            },
            as: "Quizzes",
        });

        Topic.hasMany(models.TopicProgress, {
            foreignKey: "topicId",
            as: "topicProgress",
        });

        Topic.belongsToMany(models.User, {
            through: "UserContribution",
            foreignKey: "topicId",
            as: "contributions",
        });
    };

    return Topic;
}