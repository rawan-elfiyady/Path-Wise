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
            crashCourse: data.crashCourse
        });
        return track;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create track: " + error.message);
    }
}


async function getTrackById(id) {
    return await Track.findByPk(id);
}


async function getTrackByName(name) {
    return await Track.findOne({ where: { name } });
}


async function getAllTracks() {
    return await Track.findAll();
}


async function updateTrack(id, name) {
    try {
        await Track.update({ name }, { where: { id } });
        return await Track.findByPk(id);
    } catch (error) {
        console.error("Error updating track:", error);
        throw error;
    }
}


async function deleteTrack(id) {
    try {
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