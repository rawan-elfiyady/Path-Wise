module.exports = (sequelize, DataTypes) => {
    const Roadmap = sequelize.define("Roadmap", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entityType: {
            type: DataTypes.ENUM("Track", "Technology"),
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    Roadmap.associate = (models) => {
    Roadmap.belongsTo(models.Track, {
      foreignKey: "entityId",
      constraints: false, 
      as: "track",
    });

    Roadmap.belongsTo(models.Technology, {
      foreignKey: "entityId",
      constraints: false,
      as: "technology",
    });

    Roadmap.hasMany(models.Topic, {
      foreignKey: "roadmapId",
      as: "topics",
      onDelete: "CASCADE"
    });

    Roadmap.belongsToMany(models.User, {
      through: "SavedRoadmap",
      foreignKey: "roadmapId",
      as: "savedRoadmap",
    });
   
  };

  return Roadmap;
}