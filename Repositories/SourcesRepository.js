const db = require("../models");
const { Sequelize, Source } = db;
const { Op } = require("sequelize");


async function createSource(data) {
    try {
        console.log("Data to insert:", data); 
        const source = await Source.create({
            name: data.name,
            category: data.category,
            link: data.link,
            topicId: data.topicId
        });
        return source;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); 
        throw new Error("Failed to create source: " + error.message);
    }
}


async function getSourceById(id) {
    return await Source.findByPk(id);
}

async function getSourceByName(name) {
    return await Source.findOne({ where: { name } });
}

async function getAllSources() {
    return await Source.findAll();
}

async function getSourcesByTopicId(topicId) {
    return await Source.findAll({ where: { topicId } });
}


async function updateSource(id, data) {
    try {
        await Source.update(
            {
                name: data.name,
                category: data.category,
                link: data.link,
                topicId: data.topicId
            },
            { where: { id } }
        );
        return await Source.findByPk(id);
    } catch (error) {
        console.error("Error updating source:", error);
        throw error;
    }
}

async function deleteSource(id) {
    try {
        return await Source.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting source:", error);
        throw error;
    }
}

module.exports = {
    createSource,
    getAllSources,
    getSourceById,
    getSourceByName,
    getSourcesByTopicId,
    updateSource,
    deleteSource
};
