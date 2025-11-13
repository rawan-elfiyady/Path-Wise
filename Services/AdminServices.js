const RoadmapRepo = require ("../Repositories/RoadmapRepository");

async function createRoadmap(Data) {
    try{
        const roadmap = await RoadmapRepo.createRoudmap(Data);

        return roadmap;
    }
    catch (error) {
        throw new Error(`Error creating roadmap: ${error.message}`);
    }
};

async function getAllRoadmaps() {
    const roadmaps = await RoadmapRepo.getAllRoadmaps();

    return roadmaps;
}

async function getRoadmapById(id) {
    const roadmap = await RoadmapRepo.getRoadmapById(id);

    return roadmap;
}

async function getRoadmapByName(name) {
    const roadmap = await RoadmapRepo.getRoadmapByName(name);

    return roadmap;
}

async function getTrackRoadmaps(id) {
    const roadmaps = await RoadmapRepo.getTrackRoadmaps(id);

    return roadmaps;
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
   const update = await RoadmapRepo.updateRoadmap(id, updates);

   return update;
}

async function deleteRoadmap(id) {
    try{
        const removeRoadmap = await RoadmapRepo.deleteRoadmap(id);

        return removeRoadmap;
    }
    catch (err) {
        throw new Error (`Error deleting Roadmap: ${err.message}`);
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