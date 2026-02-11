const db = require("../models");
const { Sequelize, Question } = db;
const { Op } = require("sequelize");

async function createQuestion(data) {
    try {
        return await Question.create(data);
    } catch (error) {
        console.error("Error creating question:", error);
        throw error;
    }
}

async function getAllQuestions() {
    return await Question.findAll();
}

async function getQuestionById(id) {
    return await Question.findByPk(id);
}

async function getQuestionsByQuizId(quizId) {
    return await Question.findAll({ where: { quizId } });
}

async function getQuestionByText(question) {
    return await Question.findOne({ where: { question } });
}

async function updateQuestion(id, updates) {
    return await Question.update(updates, { where: { id } });
}

async function deleteQuestion(id) {
    return await Question.destroy({ where: { id } });
}

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    getQuestionsByQuizId,
    getQuestionByText,
    updateQuestion,
    deleteQuestion
};
