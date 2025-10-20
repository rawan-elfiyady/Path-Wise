module.exports = (sequelize, DataTypes) => {
    const Source = sequelize.define("Source", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM("article", "video", "course"),
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Source.associate = (models) => {
        Source.belongsTo(models.Topic,{
            foreignKey: "topicId",
            as: "topic"
        });
    };

    return Source;
}