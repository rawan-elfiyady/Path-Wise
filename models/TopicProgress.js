module.exports = (sequelize, DataTypes) => {
    const TopicProgress = sequelize.define("TopicProgress", {
        status: {
            type: DataTypes.ENUM("InProgress", "Pending", "Done"),
            defaultValue: "Pending",
        },
    });

    TopicProgress.associate = (models) => {
        TopicProgress.belongsTo(models.SavedRoadmap, {
            foreignKey: "savedRoadmapId",
            as: "roadmap",
        });

        TopicProgress.belongsTo(models.Topic, {
            foreignKey: "topicId",
            as: "mainTopic",
        })
    };

    return TopicProgress;
}