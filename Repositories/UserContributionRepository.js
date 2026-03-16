const db = require("../models");
const { Sequelize, UserContribution, User } = db;
const { Op } = require("sequelize");

async function createUserContribution(data) {
    try {
        console.log("Creating contribution with data:", data);
        return await UserContribution.create({
            name: data.name,
            link: data.link,
            UserId: data.userId,
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
    try {
        const contributions = await UserContribution.findAll({
            include: [{ model: User, as: "user" }]
        });
        return contributions;
        
    } catch (error) {
     throw new Error("Failed to retrieve contributions: " + error.message);   
    }
}

async function getContributionsByTopicId(topicId) {
    try {
        const contributions = await UserContribution.findAll({
            where: { topicId },
            include: [{ model: User, as: "user" }]
        });
        if (contributions.length === 0) {
            throw new Error("No contributions found for this topic");
        }
        return contributions;
    } catch (error) {
        throw new Error("Failed to retrieve contributions by topic ID: " + error.message);
    }
}

async function getContributionByStatus(status) {
    try {
        const contributions = await UserContribution.findAll({
            where: { requestStatus: status },
            include: [{ model: User, as: "user" }]
        });
        if (contributions.length === 0) {
            throw new Error("No contributions found with this status");
        }
        return contributions;
    } catch (error) {
        throw new Error("Failed to retrieve contributions by status: " + error.message);
    }
}

async function getContributionsByUserId(userId) {
    try {
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            throw new Error("User not found");
        }
        const contributions = await UserContribution.findAll({
            where: { userId },
            include: [{ model: User, as: "user" }]
        });
        if (contributions.length === 0) {
            throw new Error("No contributions found for this user");
        }
        return contributions;
    } catch (error) {
        throw new Error("Failed to retrieve contributions by user ID: " + error.message);
    }
}

async function getContributionById(id) {
    try {
        const contribution = await UserContribution.findByPk(id, {
            include: [{ model: User, as: "user" }]
        });
        if (!contribution) {
            throw new Error("Contribution not found");
        }
        return contribution;
    } catch (error) {
        throw new Error("Failed to retrieve contribution by ID: " + error.message);
    }
}

async function approveContribution(id) {
    try {
        const contribution = await UserContribution.findByPk(id);
        if (!contribution) {
            throw new Error("Contribution not found");
        }
            if (contribution.requestStatus !== "Pending") {
            throw new Error("Only pending contributions can be approved");
        }
        return await contribution.update({ requestStatus: "Approved" });
    } catch (error) {
        throw new Error("Failed to approve contribution: " + error.message);
    }
}

async function rejectContribution(id) {
    try {
        const contribution = await UserContribution.findByPk(id);
        if (!contribution) {
            throw new Error("Contribution not found");
        }
        if (contribution.requestStatus !== "Pending") {
            throw new Error("Only pending contributions can be rejected");
        }
    return await UserContribution.update(
        { requestStatus: "Rejected" },
        { where: { id } }
    );
    } catch (error) {
        throw new Error("Failed to reject contribution: " + error.message);
    }
}

async function updateUserContribution(id, userId, data) {

    try{const contribution = await UserContribution.findOne({
        where: { id, userId }
    });

    if (!contribution) throw new Error("Contribution not found or not yours");

    return await contribution.update({
        name: data.name || contribution.name,
           link: data.link || contribution.link
    });}
    catch (error) {  
            throw new Error("Failed to update contribution: " + error.message);
    }
}

async function deleteContribution(id) {
    try {
        const contribution = await UserContribution.findByPk(id);
        if (!contribution) {
            throw new Error("Contribution not found");
        }
        return await UserContribution.destroy({ where: { id } });
    } catch (error) {
        throw new Error("Failed to delete contribution: " + error.message);
    }
}

module.exports = {
    createUserContribution,
    getAllContributions,
    getContributionById,
    getContributionsByTopicId,
    getContributionsByUserId,
    getContributionByStatus,
    approveContribution,
    rejectContribution,
    updateUserContribution,
    deleteContribution,
};
