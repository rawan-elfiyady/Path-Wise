const db = require("../models");
const {Sequelize, Roadmap, Topic, Source} = db;
const { Op } = require("sequelize");

async function getRoadmapById(id) {
    const roadmap = await Roadmap.findByPk(id);

    if(!roadmap) return null;
    
    return roadmap;
}

async function getRoadmapByName(name) {
    const roadmap = await Roadmap.findOne({where: {name: name}});
    
    if(!roadmap) return null;
    
    return roadmap;
}

async function searchRoadmaps(search) {
    const roadmaps = await Roadmap.findAll({
        where: {
            name: {
                [Op.iLike]: `%${search}`,
            },
        },
    });

    if(!roadmaps) return null

    return roadmaps;
}

async function getAllRoadmaps() {
    const roadmaps = await Roadmap.findAll();

    if(!roadmaps) return null;

    return roadmaps;
}

// async function getTrackRoadmaps(id) {
//     const roadmaps = await Roadmap
// }

async function updateRoadmap(id, name) {
    try {
    await Roadmap.update({name: name},{where: {id: id}});
        
    } catch (error) {
        console.error("error updating roadmap: ", error);
    }
}

async function deleteRoadmap(id) {
    try {
        await Roadmap.delete()
    } catch (error) {
        console.error("error deleting roadmap: ", error)       
    }
}