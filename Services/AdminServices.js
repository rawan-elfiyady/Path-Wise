const RoadmapRepo = require ("../Repositories/RoadmapRepository");
const TrackRepo = require ("../Repositories/TracksRepository");
const TopicRepo = require ("../Repositories/TopicRepository");
const TechnologyRepo = require ("../Repositories/TechnologiesRepository");
const SourceRepo = require("../Repositories/SourcesRepository");
const RegionsRepository = require("../Repositories/RegionsRepository");
const QuizRepo = require("../Repositories/QuizzesRepository");
const QuestionRepo = require("../Repositories/QuestionsRepository");
const UserRepo = require("../Repositories/UserRepository");
const ContributionRepo = require("../Repositories/UserContributionRepository");


async function createRoadmap(Data) {
    try {
        const roadmap = await RoadmapRepo.createRoadmap(Data);
        return roadmap;
    } catch (error) {
        throw new Error(`Error creating roadmap: ${error.message}`);
    }
}

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

async function updateRoadmap(id, updates) {
    return await RoadmapRepo.updateRoadmap(id, updates);
}

async function deleteRoadmap(id) {
    try {
        return await RoadmapRepo.deleteRoadmap(id);
    } catch (err) {
        throw new Error(`Error deleting Roadmap: ${err.message}`);
    }
}


/////////////////////////////Tracks///////////////////////////////////////


async function createTrack(Data) {
    try {
        const track = await TrackRepo.createTrack(Data);
        return track;
    } catch (error) {
        throw new Error(`Error creating track: ${error.message}`);
    }
}

async function getAllTracks() {
    return await TrackRepo.getAllTracks();
}

async function getTrackById(id) {
    return await TrackRepo.getTrackById(id);
}

async function getTrackByName(name) {
    return await TrackRepo.getTrackByName(name);
}

async function updateTrack(id, updates) {
    return await TrackRepo.updateTrack(id, updates);
}

async function deleteTrack(id) {
    try {
        return await TrackRepo.deleteTrack(id);
    } catch (err) {
        throw new Error(`Error deleting track: ${err.message}`);
    }
}


//////////////////////////////Topics////////////////////////////////////


async function createTopic(Data) {
    try {
        const topic = await TopicRepo.createTopic(Data);
        return topic;
    } catch (error) {
        throw new Error(`Error creating topic: ${error.message}`);
    }
}

async function getAllTopics() {
    return await TopicRepo.getAllTopics();
}

async function getTopicById(id) {
    return await TopicRepo.getTopicById(id);
}

async function getTopicByName(name) {
    return await TopicRepo.getTopicByName(name);
}

async function updateTopic(id, updates) {
    return await TopicRepo.updateTopic(id, updates);
}

async function deleteTopic(id) {
    try {
        return await TopicRepo.deleteTopic(id);
    } catch (err) {
        throw new Error(`Error deleting topic: ${err.message}`);
    }
}


/////////////////////////Technology///////////////////////////


async function createTechnology(Data) {
    try {
        const technology = await TechnologyRepo.createTechnology(Data);
        return technology;
    } catch (error) {
        throw new Error(`Error creating technology: ${error.message}`);
    }
}

async function getAllTechnologies() {
    return await TechnologyRepo.getAllTechnologies();
}

async function getTechnologyById(id) {
    return await TechnologyRepo.getTechnologyById(id);
}

async function getTechnologyByTrackId(trackId) {
    return await TechnologyRepo.getTechnologyByTrackId(trackId);
}

async function getTechnologyByName(name) {
    return await TechnologyRepo.getTechnologyByName(name);
}

async function updateTechnology(id, updates) {
    return await TechnologyRepo.updateTechnology(id, updates);
}

async function deleteTechnology(id) {
    try {
        return await TechnologyRepo.deleteTechnology(id);
    } catch (err) {
        throw new Error(`Error deleting technology: ${err.message}`);
    }
}

/////////////////////////////Sources/////////////////////////////////////


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

async function getSourceByName(name) {
    return await SourceRepo.getSourceByName(name);
}

async function getSourcesByTopicId(topicId) {
    return await SourceRepo.getSourcesByTopicId(topicId);
}


async function updateSource(id, data) {
    try {
        return await SourceRepo.updateSource(id, data);
    } catch (error) {
        throw new Error("Error updating source: " + error.message);
    }
}


async function deleteSource(id) {
    try {
        return await SourceRepo.deleteSource(id);
    } catch (error) {
        throw new Error("Error deleting source: " + error.message);
    }
}

////////////////////////////////Regions/////////////////////////////


async function createRegion(data) {
    try {
        const region = await RegionsRepository.createRegion(data);
        return region;
    } catch (error) {
        throw new Error("Error creating region: " + error.message);
    }
}



async function getAllRegions() {
    return await RegionsRepository.getAllRegions();
}



async function getRegionById(id) {
    return await RegionsRepository.getRegionById(id);
}



async function getRegionByName(name) {
    return await RegionsRepository.getRegionByName(name);
}



async function getRegionByTrackId(trackId) {
    return await RegionsRepository.getRegionByTrackId(trackId);
}



async function updateRegion(id, data) {
    return await RegionsRepository.updateRegion(id, data);
}



async function deleteRegion(id) {
    try{
    return await RegionsRepository.deleteRegion(id);
    } catch (err) {
        throw new Error(`Error deleting region: ${err.message}`);
    }
}


///////////////////////////////Quizess///////////////////////////////////////////


async function createQuiz(data) {
    try {
        const quiz = await QuizRepo.createQuiz(data);
        return quiz;
    } catch (error) {
        throw new Error(`Error creating quiz: ${error.message}`);
    }
}

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

async function updateQuiz(id, updates) {
    return await QuizRepo.updateQuiz(id, updates);
}

async function deleteQuiz(id) {
    try {
        return await QuizRepo.deleteQuiz(id);
    } catch (err) {
        throw new Error(`Error deleting quiz: ${err.message}`);
    }
}


////////////////////////////////////////Questions//////////////////////////////////



async function createQuestion(data) {
    return await QuestionRepo.createQuestion(data);
}

async function getAllQuestions() {
    return await QuestionRepo.getAllQuestions();
}

async function getQuestionById(id) {
    return await QuestionRepo.getQuestionById(id);
}

async function getQuestionsByQuizId(quizId) {
    return await QuestionRepo.getQuestionsByQuizId(quizId);
}

async function getQuestionByText(question) {
    return await QuestionRepo.getQuestionByText(question);
}

async function updateQuestion(id, updates) {
    return await QuestionRepo.updateQuestion(id, updates);
}

async function deleteQuestion(id) {
    try{
    return await QuestionRepo.deleteQuestion(id);
    } catch (err) {
        throw new Error(`Error deleting question: ${err.message}`);
    }
}

//---------------------------------User---------------------------------------//


async function getAllUsers() {
    return await UserRepo.getAllUsers();
}

async function getUserById(id) {
    return await UserRepo.getUserById(id);
}

async function updateUser(id, data) {
    return await UserRepo.updateUser(id, data);
}

async function deleteUser(id) {
    return await UserRepo.deleteUser(id);
}


//-----------------------------UserContribution----------------------------//


async function getAllContributions() {
    return await ContributionRepo.getAllContributions();
}

async function getUserContribution(id) {
    return await ContributionRepo.getContributionById(id);
}

async function approveContribution(id) {
    return await ContributionRepo.approveContribution(id);
}

async function rejectContribution(id) {
    return await ContributionRepo.rejectContribution(id);
}

async function deleteContribution(id) {
    return await ContributionRepo.deleteContribution(id);
}




module.exports = {
    createRoadmap,
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapByName,
    searchRoadmaps,
    getTrackRoadmaps,
    updateRoadmap,
    deleteRoadmap,
    createTrack,
    getAllTracks,
    getTrackById,
    getTrackByName,
    updateTrack,
    deleteTrack,
    createTopic,
    getAllTopics,
    getTopicById,
    getTopicByName,
    updateTopic,
    deleteTopic,
    createTechnology,
    getAllTechnologies,
    getTechnologyById,
    getTechnologyByName,
    getTechnologyByTrackId,
    updateTechnology,
    deleteTechnology,
    createSource,
    getAllSources,
    getSourceById,
    getSourceByName,
    getSourcesByTopicId,
    updateSource,
    deleteSource,
    createRegion,
    getAllRegions,
    getRegionById,
    getRegionByName,
    getRegionByTrackId,
    updateRegion,
    deleteRegion,
    createQuiz,
    getAllQuizzes,
    getQuizById,
    getQuizzesByEntity,
    getQuizByName,
    updateQuiz,
    deleteQuiz,
    createQuestion,
    getAllQuestions,
    getQuestionById,
    getQuestionsByQuizId,
    getQuestionByText,
    updateQuestion,
    deleteQuestion,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllContributions,
    getUserContribution,
    approveContribution,
    rejectContribution,
    deleteContribution
};
