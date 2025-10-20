module.exports = (sequelzie, DataTypes) => {
    const SavedRoadmap = sequelzie.define("SavedRoadmap", {
        progressStatus: {
            type: DataTypes.ENUM("InProgress", "Pending", "Done"),
            defaultValue: "Pending",
        },
        progressPercentage: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
        },
    });

    SavedRoadmap.associate = (models) =>{
        SavedRoadmap.hasMany(models.TopicProgress, {
            foreignKey: "savedRoadmapId",
            as: "topics",
            onDelete: "CASCADE",
        });
    };

    return SavedRoadmap;
}