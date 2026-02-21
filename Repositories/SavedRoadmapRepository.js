const db = require("../models");
const { SavedRoadmap, TopicProgress, sequelize } = db;



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


// UPDATE with composite key
async function updateSavedRoadmap(roadmapId, userId, updates) {
    try {
        await SavedRoadmap.update(updates, {
            where: { roadmapId, userId }
        });

        return await SavedRoadmap.findOne({
            where: { roadmapId, userId }
        });
    } catch (error) {
        console.error("Error updating SavedRoadmap:", error);
        throw error;
    }
}


async function deleteSavedRoadmap(roadmapId, userId) {

    // delete children first
    await TopicProgress.destroy({
        where: { 
            savedRoadmapId: roadmapId 
        }
    });

    // delete parent باستخدام composite key
    return await SavedRoadmap.destroy({
        where: {
            roadmapId: roadmapId,
            userId: userId
        }
    });
}




module.exports = {
    createSavedRoadmap,
    getUserSavedRoadmaps,
    getSavedRoadmapById,
    updateSavedRoadmap,
    deleteSavedRoadmap
};
