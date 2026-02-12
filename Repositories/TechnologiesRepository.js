const db = require("../models");
const { Sequelize, Technology, Track } = db;
const { Op } = require("sequelize");

async function createTechnology(data) {
    try {
        const technologyExists = await Technology.findOne({ where: { name: data.name } });


        if (technologyExists) {
            throw new Error("Technology with this name already exists");
         }
        console.log("Data to insert:", data); 

        const technology = await Technology.create({
            name: data.name,
            description: data.description,
            category: data.category,
            crashCourse: data.crashCourse
        });
        return technology;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); 
        throw new Error("Failed to create technology: " + error.message);
    }
}


async function getTechnologyById(id) {
    try {
        const technology = await Technology.findByPk(id);

        if (!technology) {
            throw new Error("Technology not found"); 
        }
        return technology;
    } catch (error) {
        throw new Error("Error fetching technology by ID: " + error.message);
    }
}


async function getTechnologyByName(name) {
    try {
        const technology = await Technology.findOne({ where: { name } });

        if (!technology) {
            throw new Error("Technology not found"); 
        }
        return technology;
        
    } catch (error) {
        throw new Error("Error fetching technology by name: " + error.message);
    }
}

async function getTechnologyByTrackId(trackId) {

    try {
        const track = await Track.findByPk(trackId);
        if (!track) {
            throw new Error("Track not found");
        }

        return await Technology.findAll({
        include: [
            {
                association: "tracks",  
                where: { id: trackId },
                attributes: [],
            }
        ]
    });

    } catch (error) {
        throw new Error("Error fetching technologies by track ID: " + error.message);
    }
 
}

async function linkTechnologyToTrack(technologyId, trackId) {
    try{
        const technology = await Technology.findByPk(technologyId);
    if (!technology) {
        throw new Error("Technology not found");
    }

    const track = await Track.findByPk(trackId);
    if (!track) {
        throw new Error("Track not found");
    }

    await technology.addTrack(track);
    return technology;
    } catch (error) {
        console.error("Error linking technology to track:", error);
        throw error;
}
}



async function getAllTechnologies() {
    try {
        const technologies = await Technology.findAll();
        if (technologies.length === 0) {
            throw new Error("No technologies found");
        }
        return technologies;
    } catch (error) {
        throw new Error("Error fetching all technologies: " + error.message);
    }
}


async function updateTechnology(id, updates) {
    try {
        const technology = await Technology.findByPk(id);
        if (!technology) {
            throw new Error("Technology not found");
        }
        await Technology.update( updates , { where: { id } });
        return await Technology.findByPk(id);
    } catch (error) {
        console.error("Error updating technology:", error);
        throw error;
    }
}


async function deleteTechnology(id) {
    try {
        const technology = await Technology.findByPk(id);
        if (!technology) {
            throw new Error("Technology not found");
        }
        return await Technology.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting technology:", error);
        throw error;
    }
}

module.exports ={
    createTechnology,
    getAllTechnologies,
    getTechnologyById,
    getTechnologyByName,
    getTechnologyByTrackId,
    linkTechnologyToTrack,
    updateTechnology,
    deleteTechnology

};