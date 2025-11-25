const RoadmapRepo = require ("../Repositories/RoadmapRepository");
const SavedSkillRepo = require ("../Repositories/SavedSkillsRepository");
const TrackRepo = require ("../Repositories/TracksRepository");
const TopicRepo = require ("../Repositories/TopicRepository");
const TechnologyRepo = require ("../Repositories/TechnologiesRepository");
const SourceRepo = require("../Repositories/SourcesRepository");


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

async function createSevedSkill(Data) {
    try {
        const SavedSkill = await SavedSkillRepo.createSevedSkill(Data);
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
    getTopicById,
    getTopicByName,
    getAllTechnologies,
    getTechnologyById,
    getTechnologyByName,
    getTechnologyByTrackId,
    createSource,
    getAllSources,
    getSourceById,
    getSourcesByTopicId
};