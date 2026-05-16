module.exports = (sequelize, DataTypes) => {
    const SavedSkill = sequelize.define("SavedSkill", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    });
    SavedSkill.associate = (models) => {
            SavedSkill.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            });
        } ;

    return SavedSkill;
}
