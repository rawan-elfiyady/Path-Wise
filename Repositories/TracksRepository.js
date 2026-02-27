const db = require("../models");
const { Sequelize, Track } = db;
const { Op } = require("sequelize");

async function createTrack(data) {
    try {
        console.log("Data to insert:", data); // <--- نطبع البيانات
        const track = await Track.create({
            name: data.name,
            description: data.description,
            keyConcepts: data.keyConcepts,
            crashCourse: data.crashCourse,
            icon: data.icon
        });
        return track;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create track: " + error.message);
    }
}


async function getTrackById(id) {
    try {
        const track = await Track.findByPk(id);
        if (!track) {
            throw new Error("Track not found with ID: " + id);
        }
        return track;
    } catch (error) {
        console.error("Error fetching track by ID:", error);
        throw error;
    }
}


async function getTrackByName(name) {
    try {
        const track = await Track.findOne({ where: { name: { [Op.like]: `%${name}%` } } });
        if (!track) {
            throw new Error("Track not found with name: " + name);
        }
        return track;
    } catch (error) {
        console.error("Error fetching track by name:", error);
        throw error;
    }
}

async function getTracksByKeyword(keyword) {
    try {
        const tracks = await Track.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                    { keyConcepts: { [Op.like]: `%${keyword}%` } }
                ]
            }
        });
        if (!tracks || tracks.length === 0) {
            throw new Error("No tracks found matching keyword: " + keyword);
        }
        return tracks;
    } catch (error) {
        console.error("Error fetching tracks by keyword:", error);
        throw error;
    }
} 

async function getTracksByName(listOfNames) {
    try {
        let tracks;
        for (const name of listOfNames) {
            const track = await Track.findOne({ where: { name } });
            if (!track) {
                throw new Error("Track not found with name: " + name);
            }
            if (!tracks) {
                tracks = [];
            }
            tracks.push(track);
        }
        return tracks;
    } catch (error) {
        console.error("Error fetching tracks by name:", error);
        throw error;
    }
}

async function getAllTracks() {
    try{
        const tracks = await Track.findAll();
    if (!tracks || tracks.length === 0) {
        throw new Error("No tracks found");
    }
    return tracks;
} catch (error) {
    console.error("Error fetching all tracks:", error);
    throw error;
}
}


async function updateTrack(id, updates) {
    try {
        const track = await Track.findByPk(id);
        if (!track) {
            throw new Error("Track not found with ID: " + id);
        }
        await Track.update( updates , { where: { id } });
        return await Track.findByPk(id);
    } catch (error) {
        console.error("Error updating track:", error);
        throw error;
    }
}


async function deleteTrack(id) {
    try {
        const track = await Track.findByPk(id);
        if (!track) {
            throw new Error("Track not found with ID: " + id);
        }
        return await Track.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting track:", error);
        throw error;
    }
}

module.exports = {
    createTrack,
    getAllTracks,
    getTrackById,
    getTrackByName,
    updateTrack,
    deleteTrack
};