const db = require("../models");
const { Sequelize, UserContribution, User } = db;
const { Op } = require("sequelize");

async function createUserContribution(data) {
    try {
        return await UserContribution.create({
            name: data.name,
            link: data.link,
            userId: data.userId,
            topicId: data.topicId || null,
            requestStatus: data.requestStatus || "Pending",
        });
    } catch (error) {
        console.error("DB error:", error);
        throw new Error("Failed to create UserContribution: " + error.message);
    }
}

async function getAllContributions() {
    return await UserContribution.findAll({
        include: [{ model: User, as: "user" }]
    });
}

async function getContributionById(id) {
    return await UserContribution.findByPk(id, {
        include: [{ model: User, as: "user" }]
    });
}

async function approveContribution(id) {
    return await UserContribution.update(
        { requestStatus: "Approved" },
        { where: { id } }
    );
}

async function rejectContribution(id) {
    return await UserContribution.update(
        { requestStatus: "Rejected" },
        { where: { id } }
    );
}

async function updateUserContribution(id, userId, data) {
    const contribution = await UserContribution.findOne({
        where: { id, userId }
    });

    if (!contribution) throw new Error("Contribution not found or not yours");

    return await contribution.update({
        name: data.name || contribution.name,
        link: data.link || contribution.link
    });
}

async function deleteContribution(id) {
    return await UserContribution.destroy({ where: { id } });
}

module.exports = {
    createUserContribution,
    getAllContributions,
    getContributionById,
    approveContribution,
    rejectContribution,
    updateUserContribution,
    deleteContribution,
};
