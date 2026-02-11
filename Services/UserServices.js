const RoadmapRepo = require ("../Repositories/RoadmapRepository");
const SavedSkillRepo = require ("../Repositories/SavedSkillsRepository");
const TrackRepo = require ("../Repositories/TracksRepository");
const TopicRepo = require ("../Repositories/TopicRepository");
const TechnologyRepo = require ("../Repositories/TechnologiesRepository");
const SourceRepo = require("../Repositories/SourcesRepository");
const RegionsRepository = require("../Repositories/RegionsRepository");
const QuizRepo = require("../Repositories/QuizzesRepository");
const QuestionsRepo = require("../Repositories/QuestionsRepository");
const UserRepo = require("../Repositories/UserRepository");
const ContributionRepo = require("../Repositories/UserContributionRepository");
const { underscoredIf } = require("sequelize/lib/utils");



////////////////////////Roadmaps//////////////////////////

async function getAllRoadmaps() {
    return await RoadmapRepo.getAllRoadmaps();
}

async function getRoadmapById(id) {
    return await RoadmapRepo.getRoadmapById(id);
}

async function getRoadmapByName(name) {
    return await RoadmapRepo.getRoadmapByName(name);
}

async function getTrackRoadmaps(id) {
    return await RoadmapRepo.getTrackRoadmaps(id);
}

async function searchRoadmaps(search) {
    if (!search || search.trim() === "") {
        throw new Error("Search term is required");
    }

    const roadmaps = await RoadmapRepo.searchRoadmaps(search);

    if (!roadmaps || roadmaps.length === 0) {
        return [];
    }

    return roadmaps;
}

////////////////////////////////SavedSkills//////////////////////////////////

async function createSevedSkill(name, userId) {
    try {
        const SavedSkill = await SavedSkillRepo.createSevedSkill(name, userId);
        return SavedSkill;
    } catch (error) {
        throw new Error(`Error creating SavedSkill: ${error.message}`);
    }
}

async function getAllSavedSkills() {
    return await SavedSkillRepo.getAllSavedSkills();
}

async function getSavedSkillById(id) {
    return await SavedSkillRepo.getSavedSkillById(id);
}

async function getSavedSkillByName(name) {
    return await SavedSkillRepo.getSavedSkillByName(name);
}

async function updateSavedSkill(id, updates) {
    return await SavedSkillRepo.updateSavedSkill(id, updates);
}

async function deleteSavedSkill(id) {
    try {
        return await SavedSkillRepo.deleteSavedSkill(id);
    } catch (err) {
        throw new Error(`Error deleting SavedSkill: ${err.message}`);
    }
}


//////////////////////////////////Tracks///////////////////////////////////


async function getAllTracks() {
    return await TrackRepo.getAllTracks();
}

async function getTrackById(id) {
    return await TrackRepo.getTrackById(id);
}

async function getTrackByName(name) {
    return await TrackRepo.getTrackByName(name);
}


///////////////////////////////Topics///////////////////////////////////////

async function getAllTopics() {
    return await TopicRepo.getAllTopics();
}

async function getTopicById(id) {
    return await TopicRepo.getTopicById(id);
}

async function getTopicsByRoadmapId(roadmapId) {
    return await TopicRepo.getTopicsByRoadmapId(roadmapId);
}


async function getTopicByName(name) {
    return await TopicRepo.getTopicByName(name);

}

//////////////////////////////////Technology//////////////////////////


async function getAllTechnologies() {
    return await TechnologyRepo.getAllTechnologies();
}

async function getTechnologyById(id) {
    return await TechnologyRepo.getTechnologyById(id);
}

async function getTechnologyByName(name) {
    return await TechnologyRepo.getTechnologyByName(name);
}

async function getTechnologyByTrackId(trackId) {
    return await TechnologyRepo.getTechnologyByTrackId(trackId);
}

/////////////////////////////Sources////////////////////////////////


async function createSource(data) {
    try {
        return await SourceRepo.createSource(data);
    } catch (error) {
        throw new Error("Error creating source: " + error.message);
    }
}


async function getAllSources() {
    return await SourceRepo.getAllSources();
}

async function getSourceById(id) {
    return await SourceRepo.getSourceById(id);
}

async function getSourcesByTopicId(topicId) {
    return await SourceRepo.getSourcesByTopicId(topicId);
}


///////////////////////////////Regions////////////////////////



async function getAllRegions() {
    return await RegionsRepository.getAllRegions();
}

async function getRegionById(id) {
    return await RegionsRepository.getRegionById(id);
}

async function getRegionByTrackId(trackId) {
    return await RegionsRepository.getRegionByTrackId(trackId);
}

async function getRegionByName(name) {
    return await RegionsRepository.getRegionByName(name);
}

///////////////////////////////Quizess//////////////////////////////////


async function getAllQuizzes() {
    return await QuizRepo.getAllQuizzes();
}

async function getQuizById(id) {
    return await QuizRepo.getQuizById(id);
}

async function getQuizzesByEntity(entityType, entityId) {
    return await QuizRepo.getQuizzesByEntity(entityType, entityId);
}

async function getQuizByName(name) {
    return await QuizRepo.getQuizByName(name);
}

//////////////////////////////////Questions///////////////////////////


async function getQuestionsByQuizId(quizId) {
    return await QuestionsRepo.getQuestionsByQuizId(quizId);
}

async function getQuestionById(id) {
    return await QuestionsRepo.getQuestionById(id);
}


//--------------------------User--------------------------------------//



async function registerUser(data) {
    return await UserRepo.createUser(data);
}

async function loginUser(email) {
    return await UserRepo.getUserByEmail(email);
}

async function getUserProfile(id) {
    return await UserRepo.getUserById(id);
}

async function updateUserProfile(id, data) {
    return await UserRepo.updateUser(id, data);
}


//----------------------------------UserContribution----------------------------//


async function createContribution(data) {
    return await ContributionRepo.createUserContribution(data);
}

async function getContributionById(id, userId) {
    const contribution = await ContributionRepo.getContributionById(id);

    if (!contribution || contribution.userId !== userId)
        throw new Error("Contribution not found or not yours");

    return contribution;
}

async function getUserContributions(userId) {
    return await ContributionRepo.getAllContributions({
        where: { userId }
    });
}

async function updateUserContribution(id, userId, data) {
    return await ContributionRepo.updateUserContribution(id, userId, data);
}

async function deleteUserContribution(id, userId) {
    const contribution = await ContributionRepo.getContributionById(id);

    if (!contribution || contribution.userId !== userId)
        throw new Error("Contribution not found or not yours");

    if (contribution.requestStatus !== "Pending")
        throw new Error("Cannot delete contribution after approval/rejection");

    return await ContributionRepo.deleteContribution(id);
}



module.exports = {
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapByName,
    getTrackRoadmaps,
    searchRoadmaps,
    createSevedSkill,
    getAllSavedSkills,
    getSavedSkillById,
    getSavedSkillByName,
    updateSavedSkill,
    deleteSavedSkill,
    getAllTracks,
    getTrackById,
    getTrackByName,
    getAllTopics,
    getTopicsByRoadmapId,
    getTopicById,
    getTopicByName,
    getAllTechnologies,
    getTechnologyById,
    getTechnologyByName,
    getTechnologyByTrackId,
    createSource,
    getAllSources,
    getSourceById,
    getSourcesByTopicId,
    getAllRegions,
    getRegionById,
    getRegionByTrackId,
    getRegionByName,
    getAllQuizzes,
    getQuizById,
    getQuizzesByEntity,
    getQuizByName,
    getQuestionsByQuizId,
    getQuestionById,
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    createContribution,
    getContributionById,
    getUserContributions,
    updateUserContribution,
    deleteUserContribution

};