 const db = require("../models");
const { Sequelize, Roadmap, Topic, UserContribution, User } = db;
const { Op } = require("sequelize");

async function createRoadmap(data) {
    try {
        console.log("Data to insert:", data);

        if(data.entityType !== "Track" && data.entityType !== "Technology") {
            throw new Error("Invalid entity type. Must be 'Track' or 'Technology'.");
        }

        if (data.entityType === "Track") {
            const track = await db.Track.findByPk(data.entityId);
            if (!track) {
                throw new Error(`Track not found with ID ${data.entityId}`);
            }
        } else if (data.entityType === "Technology") {
            const technology = await db.Technology.findByPk(data.entityId);
            if (!technology) {
                throw new Error(`Technology not found with ID ${data.entityId}`);
            }
        }
        const existingRoadmap = await Roadmap.findOne({
            where: {
                name: data.name,
                entityType: data.entityType,
                entityId: data.entityId
            }
        });
        if (existingRoadmap) {
            throw new Error("A roadmap with the same name and entity already exists.");
        }
        const roadmap = await Roadmap.create({
            name: data.name,
            entityType: data.entityType,
            entityId: data.entityId
        });
        return roadmap;
    } catch (error) {
        console.error("Sequelize / DB error details:", error); // <--- نطبع كل التفاصيل
        throw new Error("Failed to create roadmap: " + error.message);
    }
}

// GET BY ID
async function getRoadmapById(id) {
    try{
        const roadmap = await Roadmap.findByPk(id);

        if(!roadmap) {
            throw new Error("Roadmap not found with ID: " + id);
        }

        return roadmap;
    }catch(error) {
        throw new Error("Failed to get this roadmap" + error.message);
    }  
}

async function getRoadmapWithTopicsById(id) {

    try{
        const roadmap = await db.Roadmap.findByPk(id, {
        include: [
            {
            model: db.Topic,
            as: "topics",
            },
        ]
    });

    if(!roadmap){
        throw new Error("Roadmap not fount with this ID " + id )
    };
    
    return roadmap;
    } catch(error){
    throw new Error("Failed to get this roadmap with its topics: " + error.message);
    }
}

// GET BY NAME
async function getRoadmapByName(name) {
    try{
        const roadmap = await Roadmap.findOne({ where: { name } });

        if(!roadmap){
            throw new Error("Roadmap not found with name " + name)
        }
        return roadmap; 
    } catch(error){
        throw new Error("Roadmap Not Found " + Error.message);
    }
}
// async function getRoadmapsDetails() {
//     try {
//         const roadmaps = await Roadmap.findAll({
//     attributes: [
//       'id',
//       'name',

//       // topics count
//       [
//         Sequelize.fn(
//           'COUNT',
//           Sequelize.fn('DISTINCT', Sequelize.col('Topics.id'))
//         ),
//         'topicsCount'
//       ],

//       // contributions count
//       [
//         Sequelize.fn(
//           'COUNT',
//           Sequelize.fn('DISTINCT', Sequelize.col('Topics->Contributions.id'))
//         ),
//         'contributionsCount'
//       ],

//       // enrolled users count
//       [
//         Sequelize.fn(
//           'COUNT',
//           Sequelize.fn('DISTINCT', Sequelize.col('Users.id'))
//         ),
//         'enrollmentsCount'
//       ]
//     ],

//     include: [
//       {
//         model: Topic,
//         attributes: [],
//         include: [
//           {
//             model: Contribution,
//             attributes: []
//           }
//         ]
//       },
//       {
//         model: User,
//         attributes: [],
//         through: { attributes: [] } // SavedRoadmaps
//       }
//     ],

//     group: ['Roadmap.id', 'Roadmap.name'],
//     subQuery: false
//   });

//   return roadmaps;
//     } catch (error) {
//         console.error("Error fetching roadmap details:", error);
//         throw new Error("Failed to fetch roadmap details");
//     }
// }


// SEARCH

async function getRoadmapsDetails() {
  try {
    const roadmaps = await Roadmap.findAll({
      attributes: ['id', 'name']
    });

    const result = await Promise.all(
      roadmaps.map(async (roadmap) => {

        // 1️⃣ Count Topics directly
        const topicsCount = await Topic.count({
          where: { roadmapId: roadmap.id }
        });

        console.log(`Roadmap ID ${roadmap.id} - Topics Count:`, topicsCount); // Debugging log

        // 2️⃣ Count Contributions through Topics
        const contributionsCount = await UserContribution.count({
            include: [{
                model: Topic,
                as: "topic",   // 🔥 VERY IMPORTANT
                required: true,
                where: { roadmapId: roadmap.id },
                attributes: []
            }]
            });

            console.log(`Roadmap ID ${roadmap.id} - Contributions Count:`, contributionsCount); // Debugging log

        // 3️⃣ Count Enrollments (Many-to-Many)
        const enrollmentsCount = await User.count({
          include: [{
            model: Roadmap,
            as: "savedRoadmaps",
            required: true,
            where: { id: roadmap.id },
            attributes: [],
            through: { attributes: [] }
          }]
        });
        console.log(`Roadmap ID ${roadmap.id} - Enrollments Count:`, enrollmentsCount); // Debugging log

        return {
          id: roadmap.id,
          name: roadmap.name,
          topicsCount,
          contributionsCount,
          enrollmentsCount
        };
      })
    );

    return result;

  } catch (error) {
    console.error("REAL ERROR:", error);
    throw error;
  }
}


async function searchRoadmaps(search) {
    try{
        return await Roadmap.findAll({
        where: {
            name: { [Op.iLike]: `%${search}%` }
        }
    });
    } catch(error){
        throw new Error("Cannot Find Roadmaps " + error.message);
    } 
}

async function getTechnologiesRoadmaps() {
    try{
        const roadmaps = await Roadmap.findAll({
        where: {
            entityType: "Technology",
        }
    });

        if(!roadmaps || roadmaps.length === 0) {
            throw new Error("There is no roadmaps for Technologies");
        }

    return roadmaps;
    }catch(error) {
        throw new Error("Cannot Get Roadmaps Related To Technologies " + error.message );
    }
}

async function getTracksRoadmaps(id) {
    try{ 
        const roadmaps = await Roadmap.findAll({
        where: {
            entityType: "Track",
        }
    });
 
        if(!roadmaps) {
            throw new Error("There is no roadmaps")
        }

    return roadmaps;
}catch(error){
        throw new Error("Cannot Get Roadmaps Related To Tracks " + error.message );
}
}

async function getTrackRoadmaps(id) {
    try{ 
        const roadmaps = await Roadmap.findAll({
        where: {
            entityType: "Track",
            entityId: id
        }
    });

        if(!roadmaps || roadmaps.length === 0) {
            throw new Error("There is no roadmaps for Tracks");
        }

    return roadmaps;
}catch(error){
        throw new Error("Cannot Get Roadmaps Related To Tracks " + error.message );
}
}

async function getTechnologyRoadmaps(id) {
    try{ 
        const roadmaps = await Roadmap.findAll({
        where: {
            entityType: "Technology",
            entityId: id
        }
    });

        if(!roadmaps || roadmaps.length === 0) {
            throw new Error("There is no roadmaps for Technologies");
        }

    return roadmaps;
}catch(error){
        throw new Error("Cannot Get Roadmaps Related To Technologies " + error.message );
}
}

// GET ALL
async function getAllRoadmaps() {
    try{
        const roadmaps = await Roadmap.findAll();

        if( !roadmaps ){
            throw new Error("There is no Roadmaps ")
        }

        return roadmaps;

    }catch(error){
        throw new Error("Cannot Get Roadmaps " + error.message );
    }
}



// UPDATE
async function updateRoadmap(id, updates) {
    try {
        const roadmap = await Roadmap.findByPk(id);
        if(!roadmap){
            throw new Error("Roadmap Doesn't Exist");
        }
        await Roadmap.update(updates , { where: { id } });
        return await Roadmap.findByPk(id);
    } catch (error) {
        console.error("Error updating roadmap:", error);
        throw error;
    }
}

// DELETE
async function deleteRoadmap(id) {
    try {
        const roadmap = await Roadmap.findByPk(id);
        if(!roadmap){
            throw new Error("Roadmap Doesn't Exist");
        }
        return await Roadmap.destroy({ where: { id } });
    } catch (error) {
        console.error("Error deleting roadmap:", error);
        throw error;
    }
}

module.exports = {
    createRoadmap,
    getAllRoadmaps,
    getRoadmapsDetails,
    getRoadmapById,
    getRoadmapWithTopicsById,
    getRoadmapByName,
    searchRoadmaps,
    getTracksRoadmaps,
    getTechnologiesRoadmaps,
    getTrackRoadmaps, 
    getTechnologyRoadmaps,
    updateRoadmap,
    deleteRoadmap
};
