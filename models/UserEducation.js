module.exports =  (sequelize, DataTypes) => {
    const UserEducation = sequelize.define("UserEducation", {
        institution: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fieldOfStudy: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },  
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    UserEducation.associate = (models) => {
        UserEducation.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
            onDelete: "CASCADE",
        });
    };

    return UserEducation;
}