const db = require("../models");
const { Sequelize, SavedSkill } = db;
const { Op } = require("sequelize");



async function createSevedSkill(data) {
    try {
        console.log("Data to insert:", data); 
        const savedSkill = await SavedSkill.create({
            name: data.name,
        });
        return savedSkill;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); 
        throw new Error("Failed to create savedSkill: " + error.message);
    }
}


async function getAllSavedSkills() {
    return await SavedSkill.findAll();
}


async function getSavedSkilById(id) {
    return await SavedSkill.findByPk(id);
}


async function getSavedSkillByName(name) {
    return await SavedSkill.findOne({ where: { name } });
}


async function updateSavedSkill(id, name) {
    try {
        await SavedSkill.update({ name }, { where: { id } });
        return await SavedSkill.findByPk(id);
    } catch (error) {
        console.error("Error updating SavedSkill:", error);
        throw error;
    }
}


async function deleteSavedSkill(id) {
    try {
        return await SavedSkill.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting SavedSkill:", error);
        throw error;
    }
}


module.exports = {
    createSevedSkill,
    getAllSavedSkills,
    getSavedSkilById,
    getSavedSkillByName,
    updateSavedSkill,
    deleteSavedSkill
}