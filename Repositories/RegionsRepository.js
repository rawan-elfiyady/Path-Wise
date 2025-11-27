const db = require("../models");
const { Sequelize, Region } = db;
const { Op } = require("sequelize");

async function createRegion(data) {
    try {
        console.log("Data to insert:", data);

        const region = await Region.create({
            name: data.name
        });

        return region;
    } catch (error) {
        console.error("Sequelize / DB error details:", error);
        throw new Error("Failed to create region: " + error.message);
    }
}


async function getRegionById(id) {
    return await Region.findByPk(id);
}


async function getRegionByName(name) {
    return await Region.findOne({ where: { name } });
}


async function getRegionByTrackId(trackId) {
    return await Region.findAll({
        include: [
            {
                association: "Tracks",
                where: { id: trackId },
                attributes: []
            }
        ]
    });
}


async function getAllRegions() {
    return await Region.findAll();
}


async function updateRegion(id, data) {
    try {
        await Region.update(data, { where: { id } });
        return await Region.findByPk(id);
    } catch (error) {
        console.error("Error updating region:", error);
        throw error;
    }
}


async function deleteRegion(id) {
    try {
        return await Region.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting region:", error);
        throw error;
    }
}


module.exports = {
    createRegion,
    getAllRegions,
    getRegionById,
    getRegionByName,
    getRegionByTrackId,
    updateRegion,
    deleteRegion
};
