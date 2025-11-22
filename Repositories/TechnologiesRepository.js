const db = require("../models");
const { Sequelize, Technology } = db;
const { Op } = require("sequelize");

async function createTechnology(data) {
    try {
        console.log("Data to insert:", data); // <--- نطبع البيانات
        const technology = await Technology.create({
            name: data.name,
            description: data.description,
            category: data.category,
            crashCourse: data.crashCourse
        });
        return technology;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create technology: " + error.message);
    }
}


async function getTechnologyById(id) {
    return await Technology.findByPk(id);
}


async function getTechnologyByName(name) {
    return await Technology.findOne({ where: { name } });
}

/*async function getTechnologyByTrackId(trackId) {
    return await Technology.findAll({ where: { trackId } });
}*/


async function getAllTechnologies() {
    return await Technology.findAll();
}


async function updateTechnology(id, name) {
    try {
        await Technology.update({ name }, { where: { id } });
        return await Technology.findByPk(id);
    } catch (error) {
        console.error("Error updating technology:", error);
        throw error;
    }
}


async function deleteTechnology(id) {
    try {
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
    
    updateTechnology,
    deleteTechnology

};