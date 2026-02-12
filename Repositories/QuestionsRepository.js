const db = require("../models");
const { Sequelize, Question } = db;
const { Op } = require("sequelize");

async function createQuestion(data) {
    try {
        const existingQuestion = await Question.findOne({ where: { question: data.question } });
        if (existingQuestion) {
            throw new Error("Question already exists");
        }
        return await Question.create(data);
    } catch (error) {
        console.error("Error creating question:", error);
        throw error;
    }
}

async function getAllQuestions() {
    try {
        const questions = await Question.findAll();
        if (questions.length === 0) {
            throw new Error("No questions found");
        }
        return questions;
    } catch (error) {
        throw new Error("Error fetching questions: " + error.message);
    }
}

async function getQuestionById(id) {
    try {
        const question = await Question.findByPk(id);
        if (!question) {
            throw new Error("Question not found");
        }
        return question;
    } catch (error) {
        throw new Error("Error fetching question: " + error.message);
    }
}

async function getQuestionsByQuizId(quizId) {
    try {
    const questions = await Question.findAll({ where: { quizId } });
    if (questions.length === 0) {
        throw new Error("No questions found for this quiz");
    }
    return questions;
    } catch (error) {
    throw new Error("Error fetching questions by quiz ID: " + error.message);
    }
}

async function getQuestionByText(question) {
    try{
        const existingQuestion = await Question.findOne({ where: { question } });
    if (!existingQuestion) {
        throw new Error("Question not found");
    }
    return existingQuestion;
    }catch (error) {
            throw new Error("Error fetching question by text: " + error.message);
}
}

async function updateQuestion(id, updates) {
    try {
    const question = await Question.findByPk(id);
    if (!question) {
        throw new Error("Question not found"); 
    } 
        return await Question.update(updates, { where: { id } });
    } catch (error) {
         throw new Error("Error updating question: " + error.message); 
        }
}

async function deleteQuestion(id) {
    try {
        const question= await Question.findByPk(id);
    if (!question) {
    throw new Error("Question not found");
    }
    return await Question.destroy({ where: { id } });
    } catch (error) {
        throw new Error("Error deleting question: " + error.message);
    }
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
