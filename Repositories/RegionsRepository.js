const db = require("../models");
const { Sequelize, Region, MarketDemand, Track } = db;
const { Op } = require("sequelize");

async function createRegion(data) {
    try {
        const existingRegion = await Region.findOne({ where: { name: data.name } });
        if (existingRegion) {
            throw new Error("Region with this name already exists.");
        }
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
    try {
        const region = await Region.findByPk(id);
        if (!region) {
            throw new Error("Region not found with ID: " + id);
        }
        return region;
    } catch (error) {
        console.error("Error fetching region by ID:", error);
        throw error;
    }
}


async function getRegionByName(name) {
    try {
        const region = await Region.findOne({ where: { name } });
        if (!region) {
            throw new Error("Region not found with name: " + name);
        }
        return region;
    } catch (error) {
        console.error("Error fetching region by name:", error);
        throw error;
    }
    }


async function getRegionByTrackId(trackId) {
    try {
        const trackExists = await db.Track.findByPk(trackId);
        if (!trackExists) {
            throw new Error("Track not found with ID: " + trackId);
        }

        return await Region.findAll({
            include: [
                {
                    association: "Tracks",
                    where: { id: trackId },
                    attributes: []
                }
            ]
        });
    } catch (error) {
        console.error("Error fetching regions by track ID:", error);
        throw error;
    }
}

async function getStatisticsForTracks(regionName, trackNames){
    try {
        let statistics = [];
        const region = await Region.findOne({ where: { name: regionName } });
        if (!region) {
            throw new Error("Region not found with name: " + regionName);
        }
        const tracks = await region.getTracks({ where: { name: { [Op.in]: trackNames } } });
        if (tracks.length === 0) {
            throw new Error("No tracks found with the provided names in the specified region.");
        }

        for (const name of trackNames) {    
            const statistic = await MarketDemand.findOne({
                where: {
                    region: regionName,
                    track: name
                },
                // attributes: ['demandPercentage']
            });
            statistics.push(statistic);
        }
        return statistics;
    } catch (error) {
        console.error("Error fetching statistics for tracks:", error);
        throw error;
    }
}

async function getAllRegions() {
    try {
        const regions = await Region.findAll();
        if (regions.length === 0) {
            throw new Error("No regions found.");
        }
        return regions;
    } catch (error) {
        console.error("Error fetching all regions:", error);
        throw error;
    }
}


async function updateRegion(id, data) {
    try {
        const region = await Region.findByPk(id);
        if (!region) {
            throw new Error("Region not found with ID: " + id); 
        }
        await Region.update(data, { where: { id } });
        return await Region.findByPk(id);
    } catch (error) {
        console.error("Error updating region:", error);
        throw error;
    }
}


async function deleteRegion(id) {
    try {
        const region = await Region.findByPk(id);
        if (!region) {
            throw new Error("Region not found with ID: " + id); 
        }
        return await Region.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting region:", error);
        throw error;
    }
}


module.exports = {
    createRegion,
    getAllRegions,
    getStatisticsForTracks,
    getRegionById,
    getRegionByName,
    getRegionByTrackId,
    updateRegion,
    deleteRegion
};
