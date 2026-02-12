const db = require("../models");
const { Sequelize, Source } = db;
const { Op } = require("sequelize");


async function createSource(data) {
    try {
        const existingSource = await Source.findOne({ where: { name: data.name } });
        if (existingSource) {
            throw new Error("Source with this name already exists.");
        }
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
    try {
        const source = await Source.findByPk(id);
        if (!source) {
            throw new Error("Source not found");
        }
        return source;
    } catch (error) {
        throw new Error("Error retrieving source: " + error.message);
    }
}

async function getSourceByName(name) {
    try {
        const source = await Source.findOne({ where: { name } });
        if (!source) {
            throw new Error("Source not found");
        }
        return source;
    } catch (error) {
        throw new Error("Error retrieving source by name: " + error.message);
    }
}

async function getAllSources() {
    try {
        const sources = await Source.findAll();
        if (sources.length === 0) {
            throw new Error("No sources found");
        }
        return sources;
    } catch (error) {
        throw new Error("Error retrieving all sources: " + error.message);
    }
}

async function getSourcesByTopicId(topicId) {
    try {
        const topicSources = await Source.findAll({ where: { topicId } });
        if (topicSources.length === 0) {
            throw new Error("No sources found for the given topic ID");
        }
        return topicSources;
    } catch (error) {
        throw new Error("Error retrieving sources by topic ID: " + error.message);
    }
}


async function updateSource(id, data) {
    try {
        const existingSource = await Source.findByPk(id);
        if (!existingSource) {
            throw new Error("Source not found");
        }
        await Source.update(data,
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
        const existingSource = await Source.findByPk(id);
        if (!existingSource) {
            throw new Error("Source not found");
        }
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
