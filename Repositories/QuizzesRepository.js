const db = require("../models");
const { Sequelize, Quiz } = db;
const { Op } = require("sequelize");

// CREATE
async function createQuiz(data) {
    try {
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
    return await Quiz.findByPk(id);
}

// GET BY NAME
async function getQuizByName(name) {
    return await Quiz.findOne({ where: { name } });
}

// GET ALL
async function getAllQuizzes() {
    return await Quiz.findAll();
}

// GET QUIZZES BY Track or Topic (dynamic)
async function getQuizzesByEntity(entityType, entityId) {
    return await Quiz.findAll({
        where: { entityType, entityId },
        include: [
            { model: Question, as: "questions" }
        ]
    });
}

// UPDATE
async function updateQuiz(id, updates) {
    try {
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
