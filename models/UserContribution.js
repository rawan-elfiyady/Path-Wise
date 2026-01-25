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
        userId: {                 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        topicId: {                
            type: DataTypes.INTEGER,
            allowNull: true,      
        }
    });

    UserContribution.associate = (models) => {
        UserContribution.belongsTo(models.User, { 
            foreignKey: "userId", 
            as: "user" 
        });
    };

    return UserContribution;
};
