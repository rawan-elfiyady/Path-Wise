const { Quiz, Question } = require("../models");
const { Op } = require("sequelize");

// CREATE
async function createQuiz(data) {
    try {
        const existingQuiz = await Quiz.findOne({ where: { name: data.name } });
        if (existingQuiz) {
            throw new Error("Quiz with this name already exists");
        }
        console.log("Data to insert:", data);

        const quiz = await Quiz.create({
            name: data.name,
            numOfQuestions: data.numOfQuestions,
            grade: data.grade,
            entityType: data.entityType,
            entityId: data.entityId
        });

        return quiz;
    } catch (error) {
        console.error("Sequelize / DB error details:", error);
        throw new Error("Failed to create quiz: " + error.message);
    }
}

// GET BY ID
async function getQuizById(id) {
    try {
        const quiz = await Quiz.findByPk(id);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        return quiz;
    } catch (error) {
        throw new Error("Failed to retrieve quiz: " + error.message);
    }
}

// GET BY NAME
async function getQuizByName(name) {
    try {
        const quiz = await Quiz.findOne({ where: { name } });
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        return quiz;
    } catch (error) {
        throw new Error("Failed to retrieve quiz: " + error.message);
    }
}

// GET ALL
async function getAllQuizzes() {
    try {
        const quizzes = await Quiz.findAll();
            if (!quizzes || quizzes.length === 0) {
                throw new Error("No quizzes found");
            }
            return quizzes;
    } catch (error) {
        throw new Error("Failed to retrieve quizzes: " + error.message);
    }
}

// GET QUIZZES BY Track or Topic (dynamic)
async function getQuizzesByEntity(entityType, entityId) {
    try {

        entityType = entityType.toLowerCase();   

        const validEntityTypes = ["track", "topic"];

        if (!validEntityTypes.includes(entityType)) {
            throw new Error("Invalid entity type. Must be 'track' or 'topic'.");
        }

        entityType = entityType.charAt(0).toUpperCase() + entityType.slice(1).toLowerCase();

        const quizzes = await Quiz.findAll({
            where: { entityType, entityId },
            include: [
                {
                    model: Question,
                    as: "questions"
                }
            ]
        });

        if (!quizzes.length) {
            throw new Error("No quizzes found for the specified entity");
        }

        return quizzes;

    } catch (error) {
        throw new Error("Failed to retrieve quizzes by entity: " + error.message);
    }
}


// UPDATE
async function updateQuiz(id, updates) {
    try {
        const quiz = await Quiz.findByPk(id);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        await Quiz.update(updates, { where: { id } });
        return await Quiz.findByPk(id);
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
}

// DELETE
async function deleteQuiz(id) {
    try {
        const quiz = await Quiz.findByPk(id);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        return await Quiz.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw error;
    }
}

module.exports = {
    createQuiz,
    getQuizById,
    getQuizByName,
    getAllQuizzes,
    getQuizzesByEntity,
    updateQuiz,
    deleteQuiz
};
