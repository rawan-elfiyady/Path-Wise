const express = require("express");
const router = express.Router();
const AdminServices = require("../Services/AdminServices");
const verifyToken = require("../Middlewares/verifyToken");
const authorize = require("../Middlewares/auth")

// CREATE ROADMAP
router.post("/createRoadmap",verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const data = req.body;
        const roadmap = await AdminServices.createRoadmap(data);

        res.status(201).json({
            message: "Roadmap created successfully",
            data: roadmap
        });
    }
    catch (error) {
        next(error);
    }
});

// GET ALL ROADMAPS
router.get("/roadmaps", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const roadmaps = await AdminServices.getAllRoadmaps();
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

router.get("/roadmapsDetails",verifyToken, authorize("admin"), async (req, res, next) => {
try {
const roadmaps = await AdminServices.getRoadmapsDetails();
res.status(200).json(roadmaps);
} catch (err) {
next(err);
}});

router.get("/roadmapWithTopics/:id", verifyToken, authorize("admin"), async(req, res, next) => {
    try{
        const id = req.params.id;
        const roadmaps = await AdminServices.getRoadmapsWithTopicsById(id);
        res.status(200).json(roadmaps);
    } catch(error){
        next(error);
    }
})

router.get("/TracksRoadmaps", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const roadmaps = await AdminServices.getTracksRoadmaps();
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

router.get("/TechnologiesRoadmaps", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const roadmaps = await AdminServices.getTechnologiesRoadmaps();
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/roadmap/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const roadmap = await AdminServices.getRoadmapById(id);

        res.status(200).json(roadmap);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/roadmapByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const roadmap = await AdminServices.getRoadmapByName(name);

        res.status(200).json(roadmap);
    }
    catch (err) {
        next(err);
    }
});

// GET ROADMAPS FOR A TRACK
router.get("/trackRoadmaps/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const roadmaps = await AdminServices.getTrackRoadmaps(id);

        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

router.get("/technologyRoadmaps/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const roadmaps = await AdminServices.getTechnologyRoadmaps(id);
        res.status(200).json(roadmaps);
    }
    catch (err) {
        next(err);
    }
});

// SEARCH ROADMAPS
router.get("/searchRoadmaps", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { search } = req.query;
        const roadmaps = await AdminServices.searchRoadmaps(search);

        res.status(200).json({
            success: true,
            count: roadmaps.length,
            data: roadmaps
        });
    }
    catch (err) {
        next(err);
    }
});

// UPDATE ROADMAP
router.put("/roadmap/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateRoadmap(id, updates);

        res.status(200).json({
            message: "Roadmap updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});

// DELETE ROADMAP
router.delete("/roadmap/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteRoadmap(id);

        res.status(200).json({
            message: "Roadmap deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


/////////////////////////////////Tracks/////////////////////////////////////


router.post("/createTrack",  async (req, res, next) => {
    try {
        const data = req.body;
        const track = await AdminServices.createTrack(data);

        res.status(201).json({
            message: "Track created successfully",
            data: track
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/tracks", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const tracks = await AdminServices.getAllTracks();
        res.status(200).json(tracks);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/track/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const track = await AdminServices.getTrackById(id);
        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/trackByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const track = await AdminServices.getTrackByName(name);

        res.status(200).json(track);
    }
    catch (err) {
        next(err);
    }
});


router.put("/track/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTrack(id, updates);

        res.status(200).json({
            message: "Track updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/track/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTrack(id);

        res.status(200).json({
            message: "Track deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


///////////////////////////////Topics/////////////////////////////


router.post("/createTopic", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { name, description, roadmapId } = req.body;
        const topic = await AdminServices.createTopic({ name, description, roadmapId });

        res.status(201).json({
            message: "Topic created successfully",
            data: topic
        });
    }
    catch (error) {
        next(error);
    }
});

router.get("/TopicsByRoadmap/:roadmapId", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { roadmapId } = req.params;
        const topics = await AdminServices.getTopicsByRoadmapId(roadmapId);

        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Topics", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const topics = await AdminServices.getAllTopics();
        res.status(200).json(topics);
    }
    catch (err) {
        next(err);
    }
});


// GET BY ID
router.get("/Topic/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const topic = await AdminServices.getTopicById(id);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/TopicByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const topic = await AdminServices.getTopicByName(name);

        res.status(200).json(topic);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Topic/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTopic(id, updates);

        res.status(200).json({
            message: "Topic updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Topic/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTopic(id);

        res.status(200).json({
            message: "Topic deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});


//////////////////////////Technology///////////////////////////
 
router.post("/createTechnology", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const data = req.body;
        const technology = await AdminServices.createTechnology(data);

        res.status(201).json({
            message: "Technology created successfully",
            data: technology
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/Technologies", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const technologies = await AdminServices.getAllTechnologies();
        res.status(200).json(technologies);
    }
    catch (err) {
        next(err);
    }
});

// GET BY ID
router.get("/Technology/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await AdminServices.getTechnologyById(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

router.post("/linkTechnologyTrack", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { trackId, technologyId } = req.body; 

        const result = await AdminServices.linkTechnologyToTrack(technologyId, trackId);

        if(!result) {
            return res.status(404).json({ message: "Track or Technology not found" });
        }

        res.status(200).json({ message: "Technology linked to Track successfully", data: result });
    } catch (error) {
        next(error);
    }
});
router.get("/TechnologyTrackId/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const technology = await AdminServices.getTechnologyByTrackId(id);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});

// GET BY NAME (use query param)
router.get("/TechnologyByName",  verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const technology = await AdminServices.getTechnologyByName(name);

        res.status(200).json(technology);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Technology/:id",  verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateTechnology(id, updates);

        res.status(200).json({
            message: "Technology updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Technology/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteTechnology(id);

        res.status(200).json({
            message: "Technology deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});

//////////////////////////////TrackTechnologies///////////////////////////

router.get("/TrackTechnologies", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const trackTechnologies = await AdminServices.getAllTrackTechnologies();
        res.status(200).json(trackTechnologies);
    } catch (error) {
        next(error);
    }
});

// router.get("/TechnologiesByTrackId/:id", verifyToken, authorize("admin"), async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const technologies = await AdminServices.getTechnologiesByTrackId(id);
//         res.status(200).json(technologies);
//     }
//         catch (err) {
//         next(err);
//     }
// });

// router.put("/TrackTechnology/:technologyId", verifyToken, authorize("admin"), async (req, res, next) => {
//     try {
//         const technologyId = req.params.technologyId;
//         const updates = req.body;
//         const updated = await AdminServices.updateTrackTechnologies(technologyId, updates);
//         res.status(200).json({
//             message: "Track technology updated successfully",
//             data: updated
//         });
//     } catch (error) {
//         next(error);
//     }
// });

router.delete("/TrackTechnology", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { trackId, technologyId } = req.body;
        await AdminServices.deleteTrackTechnologies(trackId, technologyId);
        res.status(200).json({
            message: "Track technology deleted successfully",
        });
    } catch (error) { 
        next(error);
    }
});


///////////////////////////////Sources////////////////////////////////////

router.post("/createSource", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { name, category, link, topicId } = req.body;
        const source = await AdminServices.createSource({ name, category, link, topicId });

        res.status(201).json({
            message: "Source created successfully",
            data: source
        });
    } catch (error) {
        next(error);
    }
});


router.get("/Sources", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const sources = await AdminServices.getAllSources();
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.get("/Source/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const source = await AdminServices.getSourceById(id);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const source = await AdminServices.getSourceByName(name);
        res.status(200).json(source);
    } catch (err) {
        next(err);
    }
});


router.get("/SourceTopic/:topicId", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const sources = await AdminServices.getSourcesByTopicId(topicId);
        res.status(200).json(sources);
    } catch (err) {
        next(err);
    }
});


router.put("/Source/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateSource(id, updates);

        res.status(200).json({
            message: "Source updated successfully",
            data: updated
        });
    } catch (err) {
        next(err);
    }
});


router.delete("/Source/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteSource(id);

        res.status(200).json({
            message: "Source deleted successfully",
            deleted
        });
    } catch (err) {
        next(err);
    }
});


/////////////////////////////////Regions///////////////////////////////


router.post("/createRegion", verifyToken, authorize("admin"),  async (req, res, next) => {
    try {
        const { name } = req.body;
        const region = await AdminServices.createRegion({ name });

        res.status(201).json({
            message: "Region created successfully",
            data: region
        });
    }
    catch (error) {
        next(error);
    }
});


router.get("/Regions", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const regions = await AdminServices.getAllRegions();
        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/Region/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const region = await AdminServices.getRegionById(id);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionTrackId/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const regions = await AdminServices.getRegionByTrackId(id);

        res.status(200).json(regions);
    }
    catch (err) {
        next(err);
    }
});


router.get("/RegionByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const region = await AdminServices.getRegionByName(name);

        res.status(200).json(region);
    }
    catch (err) {
        next(err);
    }
});


router.put("/Region/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateRegion(id, updates);

        res.status(200).json({
            message: "Region updated successfully",
            data: updated
        });
    }
    catch (err) {
        next(err);
    }
});


router.delete("/Region/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteRegion(id);

        res.status(200).json({
            message: "Region deleted successfully",
            deleted
        });
    }
    catch (err) {
        next(err);
    }
});

/////////////////////////////////////Statistics//////////////////////////////////

router.post("/addMarketDemand",  async (req, res, next) => {     
    try {
        const { trackId, regionId, demandPercentage } = req.body;
        const marketDemand = await AdminServices.addMarketDemand({ trackId, regionId, demandPercentage });

        res.status(201).json({
            message: "Market Demand added successfully",
            data: marketDemand
        });
    } catch (error) {
        next(error);
    }
});

router.get("/marketDemands", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const marketDemands = await AdminServices.getAllMarketDemands();
        res.status(200).json(marketDemands);
    } catch (error) {
        next(error);
    }
});

router.get("/marketDemand/track/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const statistics = await AdminServices.getTrackStatistics(id);
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
}
);

router.get("/marketDemand/region/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const statistics = await AdminServices.getRegionStatistics(id);
        res.status(200).json(statistics);
    } catch (error) {
        next(error);
    }
});

router.get("/marketDemandByRegionAndTrack", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { regionId, trackId } = req.query;
        const marketDemand = await AdminServices.getMarketDemandByRegionAndTrack(regionId, trackId);
        res.status(200).json(marketDemand);
    } catch (error) {
        next(error);
    }
});


router.put("/marketDemand/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateMarketDemand(id, updates);
        res.status(200).json({
            message: "Market Demand updated successfully",
            data: updated
        });
    } catch (error) {
        next(error);
    }
});

router.delete("/marketDemand/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteMarketDemand(id);
        res.status(200).json({
            message: "Market Demand deleted successfully",
            deleted
        });
    } catch (error) {
        next(error);
    }
});


//////////////////////////////Quizess/////////////////////////////


router.post("/createQuiz", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { name, numOfQuestions, grade, entityType, entityId } = req.body;
        const quiz = await AdminServices.createQuiz({ name, numOfQuestions, grade, entityType, entityId });

        res.status(201).json({
            message: "Quiz created successfully",
            data: quiz
        });
    } catch (error) {
        next(error);
    }
});


router.get("/Quizzes", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const quizzes = await AdminServices.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});


router.get("/Quiz/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const quiz = await AdminServices.getQuizById(id);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});


router.get("/QuizByEntity", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { type, id } = req.query; 
        const quizzes = await AdminServices.getQuizzesByEntity(type, id);
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});

router.get("/QuizByName", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const name = req.query.name;
        const quiz = await AdminServices.getQuizByName(name);
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
});

router.put("/Quiz/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updated = await AdminServices.updateQuiz(id, updates);

        res.status(200).json({
            message: "Quiz updated successfully",
            data: updated
        });
    } catch (error) {
        next(error);
    }
});


router.delete("/Quiz/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleted = await AdminServices.deleteQuiz(id);
        res.status(200).json({
            message: "Quiz deleted successfully",
            deleted
        });
    } catch (error) {
        next(error);
    }
});

///////////////////////////////////Questions/////////////////////////////


// CREATE
router.post("/createQuestion", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const { question, answer, degree, quizId, choices } = req.body;
        const Question = await AdminServices.createQuestion({question, answer, degree, quizId, choices});

        res.status(201).json({
            message: "Question created successfully",
            data: Question
        });
    } catch (error) {
        next(error);
    }
});

// GET ALL
router.get("/Questions", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const questions = await AdminServices.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

// GET BY ID
router.get("/Question/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await AdminServices.getQuestionById(id);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
});

// GET BY QUIZ ID
router.get("/QuestionsByQuiz/:quizId", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const list = await AdminServices.getQuestionsByQuizId(quizId);

        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
});

// GET BY QUESTION TEXT
router.get("/QuestionByText", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const text = req.query.question;
        const question = await AdminServices.getQuestionByText(text);

        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put("/Question/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        await AdminServices.updateQuestion(id, updates);

        res.status(200).json({
            message: "Question updated successfully"
        });
    } catch (error) {
        next(error);
    }
});

router.put("/Question/:id/choices", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const { choices } = req.body;
        await AdminServices.updateQuestionChoices(id, choices);
        res.status(200).json({
            message: "Question choices updated successfully"
        });
    } catch (error) {
        next(error);
    }
});
// DELETE
router.delete("/Question/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await AdminServices.deleteQuestion(id);

        res.status(200).json({
            message: "Question deleted successfully",
            deleted
        });
    } catch (error) {
        next(error);
    }
});

//--------------------------------User---------------------------------//


// GET ALL USERS
router.get("/users", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const users = await AdminServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});


// GET USER BY ID
router.get("/user/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await AdminServices.getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});


// UPDATE USER
router.put("/user/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updated = await AdminServices.updateUser(id, updates);

        res.status(200).json({
            message: "User updated successfully",
            data: updated
        });

    } catch (error) {
        next(error);
    }
});


// DELETE USER
router.delete("/user/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleted = await AdminServices.deleteUser(id);

        res.status(200).json({
            message: "User deleted successfully",
            deleted
        });

    } catch (error) {
        next(error);
    }
});

//-----------------------------------UserContribution-------------------------------//

// GET ALL CONTRIBUTIONS
router.get("/contributions", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const contributions = await AdminServices.getAllContributions();
        res.status(200).json(contributions);
    } catch (error) {
        next(error);
    }
});

// GET CONTRIBUTION BY ID
router.get("/contribution/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        const contribution = await AdminServices.getUserContribution(id);

        res.status(200).json(contribution);
    } catch (error) {
        next(error);
    }
});

router.get("/contributionsByUser/:userId", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const contributions = await AdminServices.getUserContribution(userId);
        res.status(200).json(contributions);
    } catch (error) {
        next(error);
    }
});

router.get("/contributionsByTopic/:topicId", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const contributions = await AdminServices.getContributionsByTopicId(topicId);
        res.status(200).json(contributions);
    } catch (error) {
        next(error);
    }
});

router.get("/contributionsByStatus", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const status = req.query.status;
        const contributions = await AdminServices.getContributionByStatus(status);
        res.status(200).json(contributions);
    } catch (error) {
        next(error);
    }
});

// APPROVE CONTRIBUTION
router.put("/contribution/:id/approve", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.approveContribution(id);

        res.status(200).json({
            message: "Contribution approved successfully"
        });
    } catch (error) {
        next(error);
    }
});

// REJECT CONTRIBUTION
router.put("/contribution/:id/reject", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.rejectContribution(id);

        res.status(200).json({
            message: "Contribution rejected successfully"
        });
    } catch (error) {
        next(error);
    }
});

// DELETE CONTRIBUTION
router.delete("/contribution/:id", verifyToken, authorize("admin"), async (req, res, next) => {
    try {
        const id = req.params.id;
        await AdminServices.deleteContribution(id);

        res.status(200).json({
            message: "Contribution deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;