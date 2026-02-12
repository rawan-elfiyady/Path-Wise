const db = require("../models");
const {Sequelize, MarketDemand} = db;
const { Op } = require("sequelize");

async function addMarketDemand(data) {
    try {
        const regionExists = await db.Region.findByPk(data.regionId);
        if (!regionExists) {
            throw new Error("Region not found with ID: " + data.regionId);
        }
        const trackExists = await db.Track.findByPk(data.trackId);
        if (!trackExists) {
            throw new Error("Track not found with ID: " + data.trackId);
        }
        const marketDemand = await MarketDemand.create({
            demandPercentage: data.demandPercentage,
            regionId: data.regionId,
            trackId: data.trackId,
            region: regionExists.name,
            track: trackExists.name
        });
        return marketDemand;
    } catch (error) {
        console.error("Error in addMarketDemand:", error.message);
        throw error;
    }
}

async function getTrackStatistics(trackId) {
    try {
        const statistics = await MarketDemand.findAll({
            where: { trackId: trackId },
            attributes: ['region', 'demandPercentage']
        });
        if (statistics.length === 0) {
            throw new Error("No market demand data found for track ID: " + trackId);
        }
        return statistics;
    } catch (error) {
        console.error("Error in getTrackStatistics:", error.message);
        throw error;
    }
}

async function getRegionStatistics(region) {
    try {
        const statistics = await MarketDemand.findAll({
            where: { region: region },
            attributes: ['track', 'demandPercentage']
        });
        return statistics;
    }
    catch (error) {
        console.error("Error in getRegionStatistics:", error.message);
        throw error;
    }
}

async function getMarketDemandByRegionAndTrack(region, track) {
    try {
        const marketDemand = await MarketDemand.findOne({
            where: {
                region: region,
                track: track
            }
        });
        if (!marketDemand) {
            throw new Error("Market demand entry not found for region: " + region + " and track: " + track);
        }
        return marketDemand;
    } catch (error) {
        console.error("Error in getMarketDemandByRegionAndTrack:", error.message);
        throw error;
    }
}

async function updateMarketDemand(id, data) {
    try {
        const marketDemand = await MarketDemand.findByPk(id);
        if (!marketDemand) {
            throw new Error("Market demand entry not found");
        }   
        marketDemand.demandPercentage = data.demandPercentage || marketDemand.demandPercentage;
        marketDemand.region = data.region || marketDemand.region;
        marketDemand.track = data.track || marketDemand.track;
        await marketDemand.save();
        return marketDemand;
    } catch (error) {
        console.error("Error in updateMarketDemand:", error.message);
        throw error;
    }   
}

async function deleteMarketDemand(id) {
    try {
        const marketDemand = await MarketDemand.findByPk(id);
        if (!marketDemand) {
            throw new Error("Market demand entry not found");
        }
        await marketDemand.destroy();
        return { message: "Market demand entry deleted successfully" };
    } catch (error) {
        console.error("Error in deleteMarketDemand:", error.message);
        throw error;
    }       
}

module.exports = {
    addMarketDemand,
    getTrackStatistics,
    getRegionStatistics,
    getMarketDemandByRegionAndTrack,
    updateMarketDemand,
    deleteMarketDemand
};