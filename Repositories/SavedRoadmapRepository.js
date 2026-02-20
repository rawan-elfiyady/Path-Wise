const db = require("../models");
const { Sequelize, SavedRoadmap, TopicProgress } = db;
const { Op } = require("sequelize");


// CREATE
async function createSavedRoadmap(data) {
    try {
        console.log("Data to insert:", data);

        const savedRoadmap = await SavedRoadmap.create({
            userId: data.userId,
            roadmapId: data.roadmapId,
            progressStatus: data.progressStatus ,
            progressPercentage: data.progressPercentage 
        });

        return savedRoadmap;

    } catch (error) {
        console.error("Sequelize / DB error details:", error);
        throw new Error("Failed to create SavedRoadmap: " + error.message);
    }
}


// GET ALL FOR USER
async function getUserSavedRoadmaps(userId) {
    return await SavedRoadmap.findAll({
        where: { userId },
        include: [
            {
                model: TopicProgress,
                as: "topics"
            }
        ]
    });
}


// GET BY ID
async function getSavedRoadmapById(id) {
    return await SavedRoadmap.findByPk(id, {
        include: [
            {
                model: TopicProgress,
                as: "topics"
            }
        ]
    });
}


// UPDATE
async function updateSavedRoadmap(id, updates) {
    try {
        await SavedRoadmap.update(updates, { where: { id } });
        return await SavedRoadmap.findByPk(id);
    } catch (error) {
        console.error("Error updating SavedRoadmap:", error);
        throw error;
    }
}


// DELETE
async function deleteSavedRoadmap(id) {
    try {
        return await SavedRoadmap.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting SavedRoadmap:", error);
        throw error;
    }
}


module.exports = {
    createSavedRoadmap,
    getUserSavedRoadmaps,
    getSavedRoadmapById,
    updateSavedRoadmap,
    deleteSavedRoadmap
};
