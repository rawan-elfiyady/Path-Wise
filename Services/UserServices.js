const RoadmapRepo = require ("../Repositories/RoadmapRepository");
const SavedSkillRepo = require ("../Repositories/SavedSkillsRepository");
const TrackRepo = require ("../Repositories/TracksRepository");
const TopicRepo = require ("../Repositories/TopicRepository");
const TopicProgressRepo = require("../Repositories/TopicProgressRepository");
const TechnologyRepo = require ("../Repositories/TechnologiesRepository");
const SourceRepo = require("../Repositories/SourcesRepository");
const RegionsRepository = require("../Repositories/RegionsRepository");
const QuizRepo = require("../Repositories/QuizzesRepository");
const QuestionsRepo = require("../Repositories/QuestionsRepository");
const QuizGradeAnswerRepo = require("../Repositories/QuizGradeAnswerRepository");
const UserRepo = require("../Repositories/UserRepository");
const ContributionRepo = require("../Repositories/UserContributionRepository");
const SavedRoadmapRepository = require("../Repositories/SavedRoadmapRepository");
const MarketDemandRepo = require("../Repositories/MarketDemandRepository");
const { underscoredIf } = require("sequelize/lib/utils");
const axios = require("axios");
const db = require("../models");
const { SavedRoadmap } = db;



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

////////////////////////////////SavedRoadmaps////////////////////////////////


// CREATE
async function createSavedRoadmap(data) {

    const existing = await SavedRoadmapRepository.getUserSavedRoadmaps(data.userId);

    const alreadyExists = existing.find(
        r => r.roadmapId === data.roadmapId
    );

    if (alreadyExists) {
        throw new Error("Roadmap already saved by this user");
    }

    return await SavedRoadmapRepository.createSavedRoadmap(data);
}

async function calcRoadmapProgress(savedRoadmapId) {
    return await SavedRoadmapRepository.calcRoadmapProgress(savedRoadmapId);
}


// GET USER ROADMAPS
async function getUserSavedRoadmaps(userId) {

    const roadmaps = await SavedRoadmapRepository.getUserSavedRoadmaps(userId);

    if (!roadmaps || roadmaps.length === 0) {
        throw new Error("No saved roadmaps found for this user");
    }

    return roadmaps;
}

// GET BY ID
async function getSavedRoadmapById(id) {

    const roadmap = await SavedRoadmapRepository.getSavedRoadmapById(id);

    if (!roadmap) {
        throw new Error("Saved roadmap not found");
    }

    return roadmap;
}


// UPDATE
async function updateSavedRoadmap(roadmapId, userId, updates) {
    const existing = await SavedRoadmap.findOne({ where: { roadmapId, userId } });
    if (!existing) throw new Error("SavedRoadmap not found");

    return await SavedRoadmapRepository.updateSavedRoadmap(roadmapId, userId, updates);
}


async function deleteSavedRoadmap(roadmapId, userId) {

    const existing = await SavedRoadmapRepository.getSavedRoadmapById(roadmapId, userId);

    if (!existing) {
        throw new Error("Saved roadmap not found");
    }

    return await SavedRoadmapRepository.deleteSavedRoadmap(roadmapId, userId);
}

///////////////////////////////TopicProgress//////////////////////////////////

async function changeToicProgressStatus(userId, topicId, newStatus) {
    try {
        return await TopicProgressRepo.changeToicProgressStatus(userId, topicId, newStatus);
    } catch (error) {
        throw new Error(`Error changing topic progress status: ${error.message}`);
    }
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

async function getUserSavedSkills(id) {
    return await SavedSkillRepo.getUserSavedSkills(id);
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

async function showTrackDetails(trackName, regionName) {
    return await TrackRepo.showTrackDetails(trackName, regionName);
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

async function getStatisticsForTracks(regionName, trackNames) {
    return await RegionsRepository.getStatisticsForTracks(regionName, trackNames);
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

///////////////////////////////Statistics///////////////////////////////

async function getTrackStatistics(id){
    return await MarketDemandRepo.getTrackStatistics(id);
}

async function getRegionStatistics(id){
    return await MarketDemandRepo.getRegionStatistics(id);
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

async function submitQuiz(data) {
    try {
        return await QuizGradeAnswerRepo.attendQuiz(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function improveQuizGrade(quizGradeId, data) {
    try {
        return await QuizGradeAnswerRepo.improveQuizGrade(quizGradeId, data);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getQuizGradeById(id) {
    try {
        const quizGrade = await QuizGradeAnswerRepo.getQuizGradeById(id);
        return quizGrade;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getQuizGradesByUserId(userId) {
    try {
        const quizGrades = await QuizGradeAnswerRepo.getQuizGradesByUserId(userId);
        return quizGrades;
    } catch (error) {   
             throw new Error(error.message);
    }
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

////////////////////////////////////////  CV  ///////////////////////////////////////


async function generateCV(data) {
    try {
        const response = await axios.post(
            "http://localhost:8000/generate_cv/",  // ← البورت الصح
            data,
            { responseType: "arraybuffer" }       // عشان PDF
        );

        return response.data;
    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw error;
    }
}



module.exports = {
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapByName,
    getTrackRoadmaps,
    searchRoadmaps,
    createSavedRoadmap,
    calcRoadmapProgress,
    getUserSavedRoadmaps,
    getSavedRoadmapById,
    updateSavedRoadmap,
    deleteSavedRoadmap,
    changeToicProgressStatus,
    createSevedSkill,
    getUserSavedSkills,
    getSavedSkillById,
    getSavedSkillByName,
    updateSavedSkill,
    deleteSavedSkill,
    getAllTracks,
    showTrackDetails,
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
    getStatisticsForTracks,
    getRegionById,
    getRegionByTrackId,
    getRegionByName,
    getTrackStatistics,
    getRegionStatistics,
    getAllQuizzes,
    getQuizById,
    getQuizzesByEntity,
    getQuizByName,
    submitQuiz,
    improveQuizGrade,
    getQuizGradeById,
    getQuizGradesByUserId,
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
    deleteUserContribution,
    generateCV

};