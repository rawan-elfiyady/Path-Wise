module.exports = (sequelize, DataTypes) => {
    const MarketDemand = sequelize.define("MarketDemand", {
        demandPercentage : {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    });

    return MarketDemand;
}