module.exports = (sequelzie, DataTypes) => {
    const SavedRoadmap = sequelzie.define("SavedRoadmap", {
        progressStatus: {
            type: DataTypes.ENUM("InProgress", "Pending", "Done"),
            defaultValue: "Pending",
        },
        progressPercentage: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            get() {
                const rawValue = this.getDataValue('progressPercentage');
                return rawValue === null ? null : parseFloat(rawValue);
            }
        },
    });

    SavedRoadmap.associate = (models) =>{
        SavedRoadmap.hasMany(models.TopicProgress, {
            foreignKey: "savedRoadmapId",
            as: "topics",
            onDelete: "CASCADE",
        });
        SavedRoadmap.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
        SavedRoadmap.belongsTo(models.Roadmap, {
            foreignKey: "roadmapId",
            as: "roadmap",
            onDelete: "CASCADE",
        });
    };

    return SavedRoadmap;
}