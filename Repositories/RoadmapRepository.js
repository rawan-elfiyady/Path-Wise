const db = require("../models");
const { Sequelize, Roadmap } = db;
const { Op } = require("sequelize");

// CREATE
/*async function createRoadmap(data) {
    try {
        const roadmap = await Roadmap.create({
            name: data.name,
            entityType: data.entityType,
            entityId: data.entityId
        });
        return roadmap;
    } catch (error) {
        console.error("Error creating roadmap:", error);
        throw new Error("Failed to create roadmap");
    }
}*/
async function createRoadmap(data) {
    try {
        console.log("Data to insert:", data); // <--- نطبع البيانات
        const roadmap = await Roadmap.create({
            name: data.name,
            entityType: data.entityType,
            entityId: data.entityId
        });
        return roadmap;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create roadmap: " + error.message);
    }
}


// GET BY ID
async function getRoadmapById(id) {
    return await Roadmap.findByPk(id);
}

// GET BY NAME
async function getRoadmapByName(name) {
    return await Roadmap.findOne({ where: { name } });
}

// SEARCH
async function searchRoadmaps(search) {
    return await Roadmap.findAll({
        where: {
            name: { [Op.iLike]: `%${search}%` }
        }
    });
}

// GET ALL
async function getAllRoadmaps() {
    return await Roadmap.findAll();
}

// GET ROADMAPS BY TRACK (OR ANY ENTITY)
async function getTrackRoadmaps(id) {
    return await Roadmap.findAll({
        where: {
            entityId: id,
            entityType: "Track"   // لو دا اللي قصدك
        }
    });
}

// UPDATE
async function updateRoadmap(id, name) {
    try {
        await Roadmap.update({ name }, { where: { id } });
        return await Roadmap.findByPk(id);
    } catch (error) {
        console.error("Error updating roadmap:", error);
        throw error;
    }
}

// DELETE
async function deleteRoadmap(id) {
    try {
        return await Roadmap.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting roadmap:", error);
        throw error;
    }
}

module.exports = {
    createRoadmap,
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapByName,
    searchRoadmaps,
    getTrackRoadmaps,
    updateRoadmap,
    deleteRoadmap
};
