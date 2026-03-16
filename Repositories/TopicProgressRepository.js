const db = require("../models");
const { Sequelize, TopicProgress, User, Topic, QuizGrade } = db;
const { Op } = require("sequelize");

async function changeToicProgressStatus(userId, topicId, newStatus) {
    try {
        const topicProgress = await TopicProgress.findOne({
            where: {
                userId, 
                topicId
            }
        });
        if (!topicProgress) {
            throw new Error("TopicProgress not found");
        }
        topicProgress.status = newStatus;
        await topicProgress.save();
        return topicProgress;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getTopicProgressByUserId(userId, topicId) {
    try {
        const topicProgress = await TopicProgress.findOne({
            where: {
                userId,
                topicId
            }
        });
        if (!topicProgress) {
            throw new Error("TopicProgress not found");
        }
        return topicProgress;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    changeToicProgressStatus,
    getTopicProgressByUserId
};
