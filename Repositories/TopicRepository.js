  const db = require("../models");
  const { Sequelize, Topic } = db;
  const { Op } = require("sequelize");

  async function createTopic(data) {
    try {
        const roadmap = await db.Roadmap.findByPk(data.roadmapId);
        if (!roadmap) {
            throw new Error("Roadmap not found with id: " + data.roadmapId);
        }
        const existingTopic = await Topic.findOne({ where: { name: data.name, roadmapId: data.roadmapId } });
        if (existingTopic) {
            throw new Error("Topic with name '" + data.name + "' already exists.");
        }
        console.log("Data to insert:", data); // <--- نطبع البيانات
        const topic = await Topic.create({
            name: data.name,
            description: data.description,
            roadmapId: data.roadmapId
        });
        return topic;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create topic: " + error.message);
    }
}

async function getTopicsByRoadmapId(roadmapId) {
    try{
        const topics = await Topic.findAll({ where: { roadmapId } });

    if (!topics || topics.length === 0) {
        throw new Error("No topics found for roadmapId: " + roadmapId);
    }
    return topics;
}catch (error) {
    console.error("Error fetching topics by roadmapId:", error);
    throw error;
}
}

async function getTopicById(id) {

    try{
        const topic = await Topic.findByPk(id);

    if (!topic) {
        throw new Error("Topic not found with id: " + id);
    }
    return topic;
}catch (error) {
    console.error("Error fetching topic by id:", error);
    throw error;
}
}




async function getTopicByName(name) {
    try {
        const topic = await Topic.findOne({ where: { name } });
        if (!topic) {
            throw new Error("Topic not found with name: " + name);
        }
        return topic;
    } catch (error) {
        throw new Error("Failed to fetch topic by name: " + error.message);
    }
}


async function getAllTopics() {
    try {
        const topics = await Topic.findAll();
        if (!topics || topics.length === 0) {
            throw new Error("No topics found");
        }
        return topics;
    } catch (error) {
        console.error("Error fetching all topics:", error);
        throw error;
    }
}


async function updateTopic(id, updates) {
    try {
        const topic = await Topic.findByPk(id);
        if (!topic) {
            throw new Error("Topic not found with id: " + id);
        }
        await Topic.update( updates , { where: { id } });
        return await Topic.findByPk(id);
    } catch (error) {
        console.error("Error updating topic:", error);
        throw error;
    }
}


async function deleteTopic(id) {
    try {
        const topic = await Topic.findByPk(id);
        if (!topic) {
            throw new Error("Topic not found with id: " + id);
        }
        return await Topic.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting topic:", error);
        throw error;
    }
}


module.exports = {
    createTopic,
    getAllTopics,
    getTopicsByRoadmapId,
    getTopicById,
    getTopicByName,
    updateTopic,
    deleteTopic
};