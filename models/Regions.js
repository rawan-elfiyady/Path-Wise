
module.exports = (sequelize, DataTypes) => {
    const Region = sequelize.define("Region", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Region.associate = (models) => {
        Region.belongsToMany(models.Track, {
            through: "MarketDemand",
            foreignKey: "regionId"
        });
    };

    return Region;
}