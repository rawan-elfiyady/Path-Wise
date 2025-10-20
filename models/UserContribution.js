module.exports = (sequelize, DataTypes) => {
    const UserContribution = sequelize.define("UserContribution", {
        requestStatus: {
            type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
            defaultValue: "Pending",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return UserContribution;
}