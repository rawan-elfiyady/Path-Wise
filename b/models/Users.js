module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedinLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    githubLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cv:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
 });

    User.associate = (models) => {
        User.hasMany(models.SavedSkill, {
            foreignKey: "userId",
            as: "savedSkills",
            onDelete: "CASCADE",
        });

        User.hasMany(models.QuizGrade, {
            foreignKey: "userId",
            as: "quizGrades",
        });

        User.belongsToMany(models.Roadmap, {
          through: "SavedRoadmap",
          foreignKey: "userId",
          as: "savedRoadmaps",
        });

        User.hasMany(models.UserContribution, {
          foreignKey: "userId",
          as: "userContributions",
          onDelete: "SET NULL",
        });

        User.hasMany(models.TopicProgress, {
            foreignKey: "userId",
            as: "topicProgress",
        })
        
    };
 return User;
}