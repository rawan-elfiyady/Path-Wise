module.exports = (sequelize, DataTypes) => {
    const MarketDemand = sequelize.define("MarketDemand", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        demandPercentage : {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        track: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return MarketDemand;
}