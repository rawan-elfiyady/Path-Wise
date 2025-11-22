const RoadmapRepo = require ("../Repositories/RoadmapRepository");
const TrackRepo = require ("../Repositories/TracksRepository");
const TopicRepo = require ("../Repositories/TopicRepository");
const TechnologyRepo = require ("../Repositories/TechnologiesRepository");


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

/*async function getTechnologyByTrackId(trackId) {
    return await TechnologyRepo.getTechnologyByTrackId(trackId);
}*/

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
    
    updateTechnology,
    deleteTechnology
};
