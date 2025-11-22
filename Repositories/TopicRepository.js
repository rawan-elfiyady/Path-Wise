  const db = require("../models");
  const { Sequelize, Topic } = db;
  const { Op } = require("sequelize");

  async function createTopic(data) {
    try {
        console.log("Data to insert:", data); // <--- نطبع البيانات
        const topic = await Topic.create({
            name: data.name,
            description: data.description
        });
        return topic;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create topic: " + error.message);
    }
}


async function getTopicById(id) {
    return await Topic.findByPk(id);
}


async function getTopicByName(name) {
    return await Topic.findOne({ where: { name } });
}


async function getAllTopics() {
    return await Topic.findAll();
}


async function updateTopic(id, name) {
    try {
        await Topic.update({ name }, { where: { id } });
        return await Topic.findByPk(id);
    } catch (error) {
        console.error("Error updating topic:", error);
        throw error;
    }
}


async function deleteTopic(id) {
    try {
        return await Topic.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting topic:", error);
        throw error;
    }
}


module.exports = {
    createTopic,
    getAllTopics,
    getTopicById,
    getTopicByName,
    updateTopic,
    deleteTopic
};