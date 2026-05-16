const db = require("../models");
const {Sequelize, TrackTechnologies, Track, Technology} = db;
const { Op } = require("sequelize");

async function addTrackTechnology(data) {
    try {
        const trackTechnology = await TrackTechnologies.create({
            trackId: data.trackId,
            technologyId: data.technologyId,
        });
        return trackTechnology;
    } catch (error) {
        console.error("Error in addTrackTechnology:", error.message);
        throw error;
    }   
}

async function getTechnologiesByTrackId(trackId) {
    try {
        const trackTechnologies = await TrackTechnologies.findAll({
            where: { trackId: trackId },
            attributes: ["technologyId"],
        }); 
        const technologyIds = trackTechnologies.map(tt => tt.technologyId);
        return technologyIds;
    }
    catch (error) {
        console.error("Error in getTechnologiesByTrackId:", error.message);
        throw error;
    }
}

async function getAllTrackTechnologies() {
    try {
        const tracks = await Track.findAll({
            include: {
                model: Technology,
                as: "technologies",
                attributes: ["id", "name"],
                through: { attributes: [] } // hides junction table columns
            }
        });

        return tracks;

    } catch (error) {
        console.error("Error in getAllTrackTechnologies:", error.message);
        throw error;
    }
}


async function updateTrackTechnologies (technologyId, updates ) {
    try {

        const technology = await TrackTechnologies.findOne({
            where: { technologyId: technologyId, },
        });
        if (!technology) {
            throw new Error("No technology found with this id");
        }
        await TrackTechnologies.update(updates, {
            where: { 
                technologyId: technologyId,
             },
        });
        
        return technology;
    }
    catch (error) {
        console.error("Error in update TrackTechnologies:", error.message);
        throw error;
    }
}

async function deleteTrackTechnologies(trackId, technologyId) {
    try {
        const track = await Track.findByPk(trackId);

        if (!track) {
            throw new Error("Track not found");
        }

        await track.removeTechnology(technologyId);

        return { message: "Relation deleted successfully" };

    } catch (error) {
        console.error("Error deleting TrackTechnology:", error.message);
        throw error;
    }
}
module.exports = {
    addTrackTechnology,
    getTechnologiesByTrackId,
    getAllTrackTechnologies,
    updateTrackTechnologies,
    deleteTrackTechnologies,
};