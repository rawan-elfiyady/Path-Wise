const RoadmapRepo = require ("../Repositories/RoadmapRepository");

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

module.exports = {
    createRoadmap,
    getAllRoadmaps,
    getRoadmapById,
    getRoadmapByName,
    searchRoadmaps,
    getTrackRoadmaps,
    updateRoadmap,
    deleteRoadmap
};
