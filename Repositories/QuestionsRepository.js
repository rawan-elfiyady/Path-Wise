const db = require("../models");
const { Sequelize, Question, Choice } = db;
const { Op } = require("sequelize");

async function createQuestion(data) {
    try {
        const quiz = await db.Quiz.findByPk(data.quizId);
        if (!quiz) {
            throw new Error("Quiz not found");
        }
        const existingQuestion = await Question.findOne({ 
            where: { 
            question: data.question,
            quizId: data.quizId,
         } });
        if (existingQuestion) {
            throw new Error("Question already exists");
        }
        const question = await Question.create(data);
        if (data.choices && Array.isArray(data.choices)) {
            const choicesData = data.choices.map(choice => ({
                ...choice,
                questionId: question.id,
            }));
            await Choice.bulkCreate(choicesData);
        }
        return question;
    } catch (error) {
        console.error("Error creating question:", error);
        throw error;
    }
}

async function getAllQuestions() {
    try {
        const questions = await Question.findAll(
            { include: [{ model: Choice, as: "choices" }] }
        );
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
        const question = await Question.findByPk(id, { include: [{ model: Choice, as: "choices" }] });
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
    const questions = await Question.findAll({ 
        where: { quizId },
        include: [{ model: Choice, as: "choices" }] 
    });
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
        if (updates.quizId) {
            const quiz = await db.Quiz.findByPk(updates.quizId);
            if (!quiz) {
                throw new Error("Quiz not found");
            } 
        }
    const question = await Question.findByPk(id, { include: [{ model: Choice, as: "choices" }] });

    if (!question) {
        throw new Error("Question not found"); 
    } 

            return await Question.update(updates, { where: { id } });
    } catch (error) {
         throw new Error("Error updating question: " + error.message); 
        }
}

async function updateQuestionChoices(questionId, choices) {
    try {
        const question = await Question.findByPk(questionId);
        if (!question) {
            throw new Error("Question not found");
        }
        await Choice.destroy({ where: { questionId } });
        const choicesData = choices.map(choice => ({
            ...choice,
            questionId,
        }));
        await Choice.bulkCreate(choicesData);
        return await Question.findByPk(questionId, { include: [{ model: Choice, as: "choices" }] });
    } catch (error) {
        throw new Error("Error updating question choices: " + error.message);
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
    updateQuestionChoices,
    deleteQuestion
};
